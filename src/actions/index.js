import { getAnnotationsByLocation } from '../helpers/fetchHelper.js';
import { API_URL } from '../constants/url.js';
import {
  GET_ANNOTATIONS_START,
  GET_ANNOTATIONS_ERROR,
  GET_ANNOTATIONS_SUCCESS,
  SET_REGION,
  SET_USER_LOCATION,
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

export function getAnnotations(latitude, longitude) {
  return (dispatch) => {
    dispatch(getAnnotationsStart());
    return getAnnotationsByLocation(latitude,longitude)
      .then(json => {
        dispatch(getAnnotationsSuccess(json));
      }).catch((e) => {
        dispatch(getAnnotationsError(e));
      })
  }
}

export function setRegion(region) {
  return {
    type: SET_REGION,
    payload: {
      mapRegion: region
    }
  };
}

export function setUserLocation(latitude, longitude) {
  return {
    type: SET_USER_LOCATION,
    payload: {
      latitude: latitude,
      longitude: longitude
    }
  };
}
