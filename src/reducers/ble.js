import {
  WRITE_CHARACTERISTIC,
  COMPLETE_OPERATION,
  IS_CONNECTED_TO_DEVICE,
  IS_NOT_CONNECTED_TO_DEVICE,
  CHANGE_STATUS_OF_LED
} from '../constants/actionTypes.js';

const initialState = {
  operation: {},
  isConnectedToDevice: false,
  isLEDOn: false
};

export default function ble(state = initialState, action) {
  switch(action.type) {
    case WRITE_CHARACTERISTIC:
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
    default:
      return state;
  }
}
