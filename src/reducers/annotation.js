import {
  GET_ANNOTATIONS_START,
  GET_ANNOTATIONS_ERROR,
  GET_ANNOTATIONS_SUCCESS
} from '../constants/actionTypes.js';

const initialState = {
  annotations: [],
  loading: false,
  error: null
};

export default function annotation(state = initialState, action) {
  switch(action.type) {
    case GET_ANNOTATIONS_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_ANNOTATIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_ANNOTATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        annotations: action.payload
      };
    default:
      return state;
  }
}
