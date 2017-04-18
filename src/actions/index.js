import { getApi } from '../helpers/fetchHelper.js';
import { API_URL } from '../constants/url.js';
import {
  GET_ANNOTATIONS_START,
  GET_ANNOTATIONS_ERROR,
  GET_ANNOTATIONS_SUCCESS,
  FILTER_CHANGED
} from '../constants/actionTypes.js';

function getAnnotationsStart() {
  return {
    type: GET_ANNOTATIONS_START
  };
}

function getAnnotationsSuccess (json) {
  return {
    type: GET_ANNOTATIONS_SUCCESS,
    payload: json
  };
}

function getAnnotationsError (error) {
  return {
    type: GET_ANNOTATIONS_ERROR,
    payload: error
  };
}

export function getAnnotations() {
  return (dispatch) => {
    dispatch(getAnnotationsStart());
    return getApi('/annotation')
      .then(json => {
        dispatch(getAnnotationsSuccess(json));
      }).catch((e) => {
        dispatch(getAnnotationsError(e));
      })
  }
}


export function filterChanged(filterKey) {
  return {
    type: FILTER_CHANGED,
    payload: {
      filterKey: filterKey
    }
  }
}
