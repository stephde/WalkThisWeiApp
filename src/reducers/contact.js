import {
  GET_CONTACTS_START,
  GET_CONTACTS_ERROR,
  GET_CONTACTS_SUCCESS
} from '../constants/actionTypes.js';

const initialState = {
  error: null,
  loading: false,
  contacts: []
};

export default function contact(state = initialState, action) {
  switch(action.type) {
    case GET_CONTACTS_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_CONTACTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: action.payload
      };
    default:
      return state;
  }
}
