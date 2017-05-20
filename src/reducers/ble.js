import {
  WRITE_CHARACTERISTIC,
  COMPLETE_OPERATION
} from '../constants/actionTypes.js';

const initialState = {
  operation: {}
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
        initialState
      }
    default:
      return state;
  }
}
