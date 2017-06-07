import {
  WRITE_CHARACTERISTIC,
  COMPLETE_OPERATION,
  IS_CONNECTED_TO_DEVICE,
  IS_NOT_CONNECTED_TO_DEVICE,
  SET_DEVICE_ID,
  DISCONNECT_WEARABLE,
  IS_BLUETOOTH_ON,
  CHANGE_STATUS_OF_LED
} from '../constants/actionTypes.js';

const initialState = {
  operation: {},
  isConnectedToDevice: false,
  deviceId: '',
  isLEDOn: false,
  isBluetoothOn: false
};

export default function ble(state = initialState, action) {
  switch(action.type) {
    case WRITE_CHARACTERISTIC:
      return {
        ...state,
        operation: action.payload
      };
    case DISCONNECT_WEARABLE:
      return {
        ...state,
        operation: action.payload
      };
    case COMPLETE_OPERATION:
      return {
        ...state,
        operation: {}
      }
    case IS_CONNECTED_TO_DEVICE:
      return {
        ... state,
        isConnectedToDevice: true
      }
    case IS_NOT_CONNECTED_TO_DEVICE:
      return {
        ... state,
        isConnectedToDevice: false,
        deviceId: initialState.deviceId
      }
    case SET_DEVICE_ID:
      return {
        ... state,
        deviceId: action.payload.deviceId
      }
    case IS_BLUETOOTH_ON:
      return {
        ... state,
        isBluetoothOn: action.payload.isBluetoothOn
      }
    case CHANGE_STATUS_OF_LED:
     return {
       ... state,
       isLEDOn: action.payload.isLEDOn
      }
    default:
      return state;
  }
}
