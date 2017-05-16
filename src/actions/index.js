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
  SET_STORY_ACTIVE_START,
  SET_STORY_ACTIVE_ERROR,
  SET_STORY_ACTIVE_SUCCESS,
  SET_REGION,
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
