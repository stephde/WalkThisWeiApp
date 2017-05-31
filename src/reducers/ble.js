import {
  WRITE_CHARACTERISTIC,
  COMPLETE_OPERATION,
  IS_CONNECTED_TO_DEVICE,
  IS_NOT_CONNECTED_TO_DEVICE,
  CHANGE_STATUS_OF_LED,
  SET_DEVICE_ID,
  DISCONNECT_WEARABLE,
  UNSET_DEVICE_ID
} from '../constants/actionTypes.js';

const initialState = {
  operation: {},
  isConnectedToDevice: false,
  isLEDOn: false,
  deviceId: ''
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
        isConnectedToDevice: false
      }
    case CHANGE_STATUS_OF_LED:
      return {
        ... state,
        isLEDOn: action.payload.isLEDOn
      }
    case SET_DEVICE_ID:
      return {
        ... state,
        deviceId: action.payload.deviceId
      }
    case UNSET_DEVICE_ID:
      return {
        ... state,
        deviceId: initialState.deviceId
      }
    default:
      return state;
  }
}
