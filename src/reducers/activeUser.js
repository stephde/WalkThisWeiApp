import {
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SET_STORY_ACTIVE_START,
  SET_STORY_ACTIVE_ERROR,
  SET_STORY_ACTIVE_SUCCESS,

} from '../constants/actionTypes.js';

const initialState = {
  data: {},
  loading: false,
  error: null
};

export default function activeUser(state = initialState, action) {
  switch(action.type) {
    case SET_STORY_ACTIVE_START:
    case LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SET_STORY_ACTIVE_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SET_STORY_ACTIVE_SUCCESS:
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
