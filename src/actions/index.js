import {
  fetchStoriesByLocation,
  fetchStoriesById,
  fetchUserById
} from '../helpers/fetchHelper.js';
import { postLogin} from '../helpers/postHelper.js';
import { API_URL } from '../constants/url.js';
import {
  GET_STORIES_START,
  GET_STORIES_ERROR,
  GET_STORIES_SUCCESS,
  SET_STORY_ACTIVE_START,
  SET_STORY_ACTIVE_ERROR,
  SET_STORY_ACTIVE_SUCCESS,
  LOGIN_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  SET_REGION,
  SET_USER_LOCATION,
  FILTER_CHANGED
} from '../constants/actionTypes.js';

const getStoriesStart = () => ({ type: GET_STORIES_START });
const getStoriesSuccess = (json) => ({ type: GET_STORIES_SUCCESS, payload: json });
const getStoriesError = (error) => ({ type: GET_STORIES_ERROR, payload: error });

export function getStoriesAroundCurrentLocation() {
  return (dispatch, getState) => {
    dispatch(getStoriesStart());
    const { filter, position } = getState();
    const {longitude, latitude} = position.userLocation;

    return fetchStoriesByLocation(latitude, longitude, filter.categories)
      .then(json => {
        dispatch(getStoriesSuccess(json));
      }).catch((e) => {
        dispatch(getStoriesError(e));
      })
  }
}

export function getStoriesByLocation(latitude, longitude) {
  return (dispatch, getState) => {
    dispatch(getStoriesStart());
    const { filter } = getState();
    return fetchStoriesByLocation(latitude, longitude, filter.categories)
      .then(json => {
        dispatch(getStoriesSuccess(json));
      }).catch((e) => {
        dispatch(getStoriesError(e));
      })
  }
}

export function getStoriesById(storyId) {
  return (dispatch) => {
    dispatch(getStoriesStart());
    return fetchStoriesById(storyId)
      .then(json => {
        dispatch(getStoriesSuccess(json));
      }).catch((e) => {
        dispatch(getStoriesError(e));
      })
  }
}

const setStoryActiveStart = () => ({ type: SET_STORY_ACTIVE_START });
const setStoryActiveSuccess = (json) => ({ type: SET_STORY_ACTIVE_SUCCESS, payload: json });
const setStoryActiveError = (error) => ({ type: SET_STORY_ACTIVE_ERROR, payload: error });

export function setStoryActive(storyId) {
  return (dispatch) => {
    return dispatch(setStoryActiveStart());
  }
}

const loginStart = () => ({ type: LOGIN_START });
const loginSuccess = (json) => ({ type: LOGIN_SUCCESS, payload: json });
const loginError = (error) => ({ type: LOGIN_ERROR, payload: error });

export function login(deviceId, phoneNumber) {
  return (dispatch) => {
    dispatch(loginStart());
    return postLogin(deviceId, phoneNumber)
      .then(json => {
        dispatch(loginSuccess(json));
      }).catch((e) => {
        dispatch(loginError(e));
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

export function filterChanged(filterKey) {
  return {
    type: FILTER_CHANGED,
    payload: {
      filterKey: filterKey
    }
  }
}
