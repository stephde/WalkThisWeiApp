import {
  WRITE_CHARACTERISTIC,
  COMPLETE_OPERATION,
  IS_CONNECTED_TO_DEVICE
} from '../constants/actionTypes.js';

const initialState = {
  operation: {},
  isConnectedToDevice: false
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
    default:
      return state;
  }
}
