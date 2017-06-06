import {
  OPEN_PLAYER,
  PLAYER_OPENED,
  CONTROL_PLAYER,
  HANDLED_PLAYER_PRESS,
  CLOSE_PLAYER
} from '../constants/actionTypes.js';

const initialState = {
  openPlayer: false,
  annotationIndex: -1,
  controlButtonPressed: false
};

export default function ble(state = initialState, action) {
  switch(action.type) {
    case OPEN_PLAYER:
      return {
        ...state,
        openPlayer: true,
        ...action.payload
      };
    case CLOSE_PLAYER:
      return {
        ...state,
        annotationIndex: initialState.annotationIndex
      };
    case PLAYER_OPENED:
      return {
        ...state,
        openPlayer: false
      }
    case CONTROL_PLAYER:
      return {
        ...state,
        controlButtonPressed: true
      }
    case HANDLED_PLAYER_PRESS:
      return {
        ...state,
        controlButtonPressed: initialState.controlButtonPressed
      }
    default:
      return state;
  }
}
