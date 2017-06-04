import React, { Component } from 'react';
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';
import { completeOperation, isConnectedToDevice, isNotConnectedToDevice, isBluetoothOn, storeNewStatus} from '../../actions';
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
  }

  componentWillMount() {
    const subscription = this.manager.onStateChange((state) => {
      this.props.isBluetoothOn(state === 'PoweredOn');
    }, true);
  }

  componentWillReceiveProps(newProps) {
    if(!_.isEmpty(newProps.operation)) {
      this._executeOperation(newProps);
    }

    if(this.props.deviceId != newProps.deviceId) {
      if(newProps.deviceId !== '') {
        if (this.props.isBluetoothOn) {
          this.scanAndConnect();
        }
      }
    }
  }

  handleOnDisconnect() {
    console.log("Disconnected Device");
    Toast.show({
      text: 'Disconnected device!',
      position: 'top',
      buttonText: 'Okay'
    });
    this.props.isNotConnectedToDevice();
  }
  // trigger a write or read operation for the BLE
  _executeOperation(newProps) {
    if(!newProps.isConnectedToDevice) {
      return;
    }
    switch (newProps.operation.type) {
      case 'write':
        this.manager.writeCharacteristicWithResponseForDevice(this.props.deviceId,
                                                              SERVICE_ID,
                                                              WRITE_CHARACTERISTIC_ID,
                                                              this.encode(newProps.operation.command))
        .then((characteristic) => {
          if(newProps.operation.command.length > 3) {
            newProps.storeNewStatus(newProps.operation.command);
          }
          newProps.completeOperation();
        }, (rejected) => {
          console.log(rejected);
          newProps.completeOperation();
        });
        break;
      case 'disconnect':
        this.monitoring.remove();
        this.manager.cancelDeviceConnection(this.props.deviceId)
          .then(() => {this.handleOnDisconnect()})
          .catch((rejected) => {
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
    let other = command.slice(1, command.length);
    let chunk = 2;
    tmp_array = [commandOp]
    for (let i=0; i < other.length; i+=chunk) {
      tmp_array.push(other.slice(i,i+chunk));
    }
    console.log(tmp_array);
    return Buffer.from(tmp_array).toString('base64');
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
          this.monitoring = this.manager.monitorCharacteristicForDevice(this.props.deviceId,
                                                    SERVICE_ID,
                                                    READ_CHARACTERISTIC_ID,
                                                    (err, characteristic) => {
            if(err) {
              return reject(err);
            }
            if(characteristic) {
              console.log(this.decode(characteristic.value));
            }
          });
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
        return;
      }
      if (device.id === this.props.deviceId) {
        this.connect(device)
          .then(() => {
            this.manager.stopDeviceScan();
            this.manager.onDeviceDisconnected(this.props.deviceId, () => {this.handleOnDisconnect()});
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
    isBluetoothOn: (isOn) => dispatch(isBluetoothOn(isOn)),
    storeNewStatus: (command) => dispatch(storeNewStatus(command))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BleComponent)
