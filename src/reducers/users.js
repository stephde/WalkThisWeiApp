import {
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
} from '../constants/actionTypes.js';

const initialState = {
  data: {},
  loading: false,
  error: null
};

export default function activeUser(state = initialState, action) {
  switch(action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        ...action.payload
      };
    default:
      return state;
  }
}
