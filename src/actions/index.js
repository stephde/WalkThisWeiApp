import {
  fetchStoriesByLocation,
  fetchStoriesById,
  fetchUserById
} from '../helpers/fetchHelper.js';
import { API_URL } from '../constants/url.js';
import {
  GET_USER_START,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  GET_STORIES_START,
  GET_STORIES_ERROR,
  GET_STORIES_SUCCESS,
  SET_REGION,
  SET_USER,
  SET_USER_LOCATION,
  FILTER_CHANGED
} from '../constants/actionTypes.js';

const getUserStart = () => ({ type: GET_USER_START });
const getUserSuccess = json => ({ type: GET_USER_SUCCESS, payload: json });
const getUserError = error => ({ type: GET_USER_ERROR, payload: error });


export function getUser(userId) {
  return (dispatch) => {
    dispatch(getUserStart());
    return fetchUserById(userId)
      .then(json => {
        dispatch(getUserSuccess(json));
      }).catch((e) => {
        dispatch(getUserError(e));
      })
  }
}

const getStoriesStart = () => ({ type: GET_STORIES_START });
const getStoriesSuccess = (json) => ({ type: GET_STORIES_SUCCESS, payload: json });
const getStoriesError = (error) => ({ type: GET_STORIES_ERROR, payload: error });

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

export function setRegion(region) {
  return {
    type: SET_REGION,
    payload: {
      mapRegion: region
    }
  };
}

export function setUser(userId) {
  return {
    type: SET_USER,
    payload: {
      userId: userId
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
