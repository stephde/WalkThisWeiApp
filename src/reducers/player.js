import { OPEN_PLAYER, PLAYER_OPENED } from '../constants/actionTypes.js';

const initialState = {
  openPlayer: false,
  annotation: {
    title: '',
    description: ''
  }
};

export default function ble(state = initialState, action) {
  switch(action.type) {
    case OPEN_PLAYER:
      return {
        ...state,
        openPlayer: true,
        ...action.payload
      };
    case PLAYER_OPENED:
      return {
        ...state,
        openPlayer: false
      }
    default:
      return state;
  }
}
