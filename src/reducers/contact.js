import {
  ADD_CONTACT,
  ADD_NEW_CONTACT_ERROR,
  ADD_NEW_CONTACT_START,
  ADD_NEW_CONTACT_SUCCESS,
  GET_CONTACTS_START,
  GET_CONTACTS_ERROR,
  GET_CONTACTS_SUCCESS,
  UNSET_NEW_CONTACT
} from '../constants/actionTypes.js';

const initialState = {
  error: null,
  loading: false,
  contacts: [],
  addContact: false,
  newContacts: false
};

export default function contact(state = initialState, action) {
  switch(action.type) {
    case ADD_NEW_CONTACT_START:
    case GET_CONTACTS_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ADD_NEW_CONTACT_ERROR:
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
    case ADD_CONTACT:
      return {
        ...state,
        addContact: true
      }
    case ADD_NEW_CONTACT_SUCCESS:
      return {
        ...state,
        newContacts: action.payload.newContacts
      }
    case UNSET_NEW_CONTACT:
      return {
        ...state,
        newContacts: initialState.newContacts
      }
    default:
      return state;
  }
}
