import {
  GET_USER_START,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  SET_USER
} from '../constants/actionTypes.js';

const initialState = {
  data: {},
  loading: false,
  error: null
};

export default function users(state = initialState, action) {
  switch(action.type) {
    case GET_USER_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload
      };
    case SET_USER:
      return {
        ...state,
        userId: action.payload.userId
      };
    default:
      return state;
  }
}
