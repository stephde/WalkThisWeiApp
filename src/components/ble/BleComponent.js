import React, { Component } from 'react';
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

export default class BleComponent extends Component {
  constructor(props) {
    super(props);
    this.manager = new BleManager();
  }

  componentWillMount() {
    const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
          this.scanAndConnect();
          subscription.remove();
      }
    }, true);
  }

  render() {
    return null;
  }

  async bleNano() {
    var services = await this.device.services()
    console.log(services);
  }

  async fetchServicesAndCharacteristicsForDevice(device) {
    var servicesMap = {}
    var services = await device.services()

    for (let service of services) {
      var characteristicsMap = {}
      var characteristics = await service.characteristics()

      for (let characteristic of characteristics) {
        characteristicsMap[characteristic.uuid] = {
          uuid: characteristic.uuid,
          isReadable: characteristic.isReadable,
          isWritable: characteristic.isWritableWithResponse,
          isNotifiable: characteristic.isNotifiable,
          isNotifying: characteristic.isNotifying,
          value: characteristic.value
        }
      }

      servicesMap[service.uuid] = {
        uuid: service.uuid,
        isPrimary: service.isPrimary,
        characteristicsCount: characteristics.length,
        characteristics: characteristicsMap
      }
    }
    return servicesMap
  }

  encode(command) {
    let commandOp = command[0].charCodeAt(0);
    return Buffer.from([commandOp, command.slice(1, 3), command.slice(3)])
    .toString('base64');
  }

  scanAndConnect() {
      this.manager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            console.log(error);
          }
          if (device.id === 'A235E320-78C5-49FC-BEC2-24F2612B4D0E') {
              console.log("Connected to device");
              // Stop scanning as it's not necessary if you are scanning for one device.
              this.manager.connectToDevice(device.id)
              .then((device) => {
                var promise = device.discoverAllServicesAndCharacteristics();
                return promise;
              })
              .then((device) => {
                return this.fetchServicesAndCharacteristicsForDevice(device);
              })
              .then((services) => {
                let serviceId = Object.keys(services)[0];
                let characteristicId = Object.keys(services[serviceId].characteristics)
                  .find(cId => services[serviceId].characteristics[cId].isWritable);
                this.manager.writeCharacteristicWithResponseForDevice(device.id,
                                                      Object.keys(services)[0],
                                                      characteristicId,
                                                      this.encode("S121"))
                                                      .then((characteristic) => {
                                                        this.manager.writeCharacteristicWithResponseForDevice(device.id,
                                                                                              Object.keys(services)[0],
                                                                                              characteristicId,
                                                                                              this.encode("T121"))
                                                                                              .then((characteristic) => {
                                                                                                console.log(characteristic);
                                                                                              },
                                                                                              (rejected) => {
                                                                                                console.log(rejected.message);
                                                                                              });
                                                      },
                                                      (rejected) => {
                                                        console.log(rejected.message);
                                                      });
              })
              .catch((error) => {
                return console.log(error);
              });
              this.manager.stopDeviceScan();
          }
      });
  }

}
