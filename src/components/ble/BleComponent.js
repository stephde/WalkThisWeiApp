import React, { Component } from 'react';
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';
import { completeOperation, isConnectedToDevice, isNotConnectedToDevice, unsetDeviceId} from '../../actions';
import { connect } from 'react-redux';
import { Toast } from 'native-base';
import _ from 'lodash';
import {
  SERVICE_ID,
  WRITE_CHARACTERISTIC_ID,
  READ_CHARACTERISTIC_ID
} from '../../constants/ble';

class BleComponent extends Component {
  constructor(props) {
    super(props);
    this.manager = new BleManager();
    this.state = {
      bluetooth: ''
    }
  }

  componentWillMount() {
    const subscription = this.manager.onStateChange((state) => {
      this.setState({bluetooth: state});
    }, true);
  }

  componentWillReceiveProps(newProps) {
    if(!_.isEmpty(newProps.operation)) {
      this._executeOperation(newProps);
    }

    if(this.props.deviceId != newProps.deviceId) {
      if(newProps.deviceId !== '') {
        if (this.state.bluetooth === 'PoweredOn') {
          this.scanAndConnect();
        }
      }
    }
  }

  // trigger a write or read operation for the BLE
  _executeOperation(newProps) {
    switch (newProps.operation.type) {
      case 'write':
        console.log(this.serviceId);
        console.log(this.characteristicId);
        this.manager.writeCharacteristicWithResponseForDevice(this.props.deviceId,
                                                              SERVICE_ID,
                                                              WRITE_CHARACTERISTIC_ID,
                                                              this.encode(newProps.operation.command))
        .then((characteristic) => {
          newProps.completeOperation();
        }, (rejected) => {
          console.log(rejected);
          newProps.completeOperation();
        });
        break;
      case 'disconnect':
        this.manager.cancelDeviceConnection(this.props.deviceId)
        .then(() => {
          this.props.unsetDeviceId();
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

  //encode command into the format the BLE expects. BLE expects base64, where
  // letters are transformed to their respective ascii values
  // command[0]: T for trigger a pin
  // command.slice(1, 3): pin number
  // command[3]: 1 for setting pin to HIGH 0 for LOW
  encode(command) {
    let commandOp = command[0].charCodeAt(0);
    return Buffer.from([commandOp, command.slice(1, 3)])
    .toString('base64');
  }

  decode(command) {
    decoded = Buffer.from('RgM=', 'base64');
    return String.fromCharCode(decoded[0]) + decoded[1];
  }

  //connect to BLE and fetch services upon successful connection
  connect(device) {
    return new Promise((resolve, reject) => {
      this.manager.connectToDevice(device.id)
        .then((device) => {
          console.log("Connected to device");
          Toast.show({
            text: 'Connected to device!',
            position: 'top',
            buttonText: 'Okay'
          });
          this.props.isConnectedToDevice();
          return device.discoverAllServicesAndCharacteristics();
        })
        .then(() => {
          this.manager.monitorCharacteristicForDevice(this.props.deviceId,
                                                    SERVICE_ID,
                                                    READ_CHARACTERISTIC_ID,
                                                    (err, characteristic) => {
            if(err) {
              console.log(err);
            }
            console.log(this.decode(characteristic.value));
          })
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
      if (device.id === this.props.deviceId) {
        this.connect(device)
          .then(() => {
            this.manager.stopDeviceScan();
            this.manager.onDeviceDisconnected(this.props.deviceId, (error, device) => {
              console.log("Disconnected Device");
              Toast.show({
                text: 'Disconnected device!',
                position: 'top',
                buttonText: 'Okay'
              });
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
    operation: state.ble.operation,
    deviceId: state.ble.deviceId
  };
}

function mapDispatchToProps(dispatch){
  return {
    completeOperation: () => dispatch(completeOperation()),
    isConnectedToDevice: () => dispatch(isConnectedToDevice()),
    isNotConnectedToDevice: () => dispatch(isNotConnectedToDevice()),
    unsetDeviceId: () => dispatch(unsetDeviceId())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BleComponent)
