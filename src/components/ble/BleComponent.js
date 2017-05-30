import React, { Component } from 'react';
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';
import { completeOperation, isConnectedToDevice, isNotConnectedToDevice, storeNewStatus } from '../../actions';
import { connect } from 'react-redux';
import _ from 'lodash';

class BleComponent extends Component {
  constructor(props) {
    super(props);
    this.manager = new BleManager();
  }

  //Once bluetooth is turned on search for BLE device
  componentWillMount() {
    const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
          this.scanAndConnect();
          subscription.remove();
      }
    }, true);
  }

  componentWillReceiveProps(newProps) {
    if(!_.isEmpty(newProps.operation)) {
      this._executeOperation(newProps);
    }
  }

  // trigger a write or read operation for the BLE
  _executeOperation(newProps) {
    switch (newProps.operation.type) {
      case 'write':
        this.manager.writeCharacteristicWithResponseForDevice(this.device.id,
                                                              this.serviceId,
                                                              this.characteristicId,
                                                              this.encode(newProps.operation.command))
        .then((characteristic) => {
          newProps.storeNewStatus(newProps.operation.command);
          newProps.completeOperation();
        }, (rejected) => {
          console.log(rejected);
          newProps.completeOperation();
        });
        break;
      default:
        console.log(newProps.operation.type);
        console.log("Operation not supported");
    }
  }

  render() {
    return null;
  }

  // stores characteristics of a BLE service inside a map structure
  async fetchServicesAndCharacteristicsForDevice(device) {
    var servicesMap = {};
    var services = await device.services();

    for (let service of services) {
      var characteristicsMap = {};
      var characteristics = await service.characteristics();

      // get properties of characteristics
      for (let characteristic of characteristics) {
        characteristicsMap[characteristic.uuid] = {
          uuid: characteristic.uuid,
          isReadable: characteristic.isReadable,
          isWritable: characteristic.isWritableWithResponse,
          isNotifiable: characteristic.isNotifiable,
          isNotifying: characteristic.isNotifying,
          value: characteristic.value
        };
      }

      servicesMap[service.uuid] = {
        uuid: service.uuid,
        characteristics: characteristicsMap
      };
    }
    return servicesMap;
  }

  //encode command into the format the BLE expects. BLE expects base64, where
  // letters are transformed to their respective ascii values
  // command[0]: T for trigger a pin
  // command.slice(1, 3): pin number
  // command[3]: 1 for setting pin to HIGH 0 for LOW
  encode(command) {
    let commandOp = command[0].charCodeAt(0);
    return Buffer.from([commandOp, command.slice(1, 3), command[3]])
    .toString('base64');
  }

  //connect to BLE and fetch services upon successful connection
  connect(device) {
    return new Promise((resolve, reject) => {
      this.manager.connectToDevice(device.id)
        .then((device) => {
          console.log("Connected to device");
          this.props.isConnectedToDevice();
          this.device = device;
          return device.discoverAllServicesAndCharacteristics();
        })
        .then((device) => {
          return this.fetchServicesAndCharacteristicsForDevice(device);
        })
        .then((services) => {
          // services are not yet named on the BLE
          // BLE code has to name the services to identify them better
          // Currently only one service exists for the BLE
          this.serviceId = Object.keys(services)[0];
          // BLE service has a writeable and readable characteristic
          // Clear identification of characteristic has to be ensured by ble code
          this.characteristicId = Object.keys(services[this.serviceId].characteristics)
            .find(cId => services[this.serviceId].characteristics[cId].isWritable);
          return resolve();
        })
        .catch((error) => {
          return reject(error);
      });
    });
  }

  //scan for bluetooth devices
  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
      }
      //deviceId has to be more generic
      if (device.id === 'A235E320-78C5-49FC-BEC2-24F2612B4D0E') {
        this.connect(device)
          .then(() => {
            this.manager.stopDeviceScan();
            this.manager.onDeviceDisconnected(this.device.id, (error, device) => {
              console.log("Disconnected to Device");
              this.props.isNotConnectedToDevice();
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }
}

function mapStateToProps(state) {
  return {
    operation: state.ble.operation
  };
}

function mapDispatchToProps(dispatch){
  return {
    storeNewStatus: (command) => dispatch(storeNewStatus(command)),
    completeOperation: () => dispatch(completeOperation()),
    isConnectedToDevice: () => dispatch(isConnectedToDevice()),
    isNotConnectedToDevice: () => dispatch(isNotConnectedToDevice())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BleComponent)
