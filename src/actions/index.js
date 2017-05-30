import {
  fetchStoriesByLocation,
  fetchStoryById,
  fetchStoriesByIds,
  fetchUserById,
  fetchStoryProgress
} from '../helpers/fetchHelper.js';
import {
  postLogin,
  postActiveStory,
  postStoryProgress,
} from '../helpers/postHelper.js';
import { API_URL } from '../constants/url.js';
import { Actions, ActionConst } from 'react-native-router-flux';
import {
  GET_STORIES_START,
  GET_STORIES_ERROR,
  GET_STORIES_SUCCESS,
  SET_STORY_ACTIVE_START,
  SET_STORY_ACTIVE_ERROR,
  SET_STORY_ACTIVE_SUCCESS,
  SET_STORY_PROGRESS_START,
  SET_STORY_PROGRESS_ERROR,
  SET_STORY_PROGRESS_SUCCESS,
  GET_STORY_PROGRESS_START,
  GET_STORY_PROGRESS_ERROR,
  GET_STORY_PROGRESS_SUCCESS,
  LOGIN_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  SET_REGION,
  SET_USER_LOCATION,
  FILTER_CHANGED,
  SHOW_NEW_CHAPTER_TOGGLE,
  FINISHED_STORY
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
        console.error(e);
        dispatch(getStoriesError(e.message));
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
        console.error(e);
        dispatch(getStoriesError(e.message));
      })
  }
}

export function getStoriesByIds(storyIds) {
  return (dispatch) => {
    dispatch(getStoriesStart());
    return fetchStoriesByIds(storyIds)
      .then(json => {
        dispatch(getStoriesSuccess(json));
      }).catch((e) => {
        console.error(e);
        dispatch(getStoriesError(e.message));
      })
  }
}

export function getStoryById(storyId) {
  return (dispatch) => {
    dispatch(getStoriesStart());
    return fetchStoryById(storyId)
      .then(json => {
        dispatch(getStoriesSuccess(json));
      }).catch((e) => {
        console.error(e);
        dispatch(getStoriesError(e.message));
      })
  }
}

const setStoryActiveStart = () => ({ type: SET_STORY_ACTIVE_START });
const setStoryActiveSuccess = (json) => ({ type: SET_STORY_ACTIVE_SUCCESS, payload: json });
const setStoryActiveError = (error) => ({ type: SET_STORY_ACTIVE_ERROR, payload: error });

export function setStoryActive(userId, storyId) {
  return (dispatch) => {
    dispatch(setStoryActiveStart());
    return postActiveStory(userId, storyId)
      .then(json => {
        dispatch(setStoryActiveSuccess(json));
        Actions.map({type: ActionConst.RESET});
        dispatch(getStoryProgress(userId, storyId))
      }).catch((e) => {
        console.error(e);
        dispatch(setStoryActiveError(e.message));
      })
  };
}


const setStoryProgressStart = () => ({ type: SET_STORY_PROGRESS_START });
const setStoryProgressSuccess = (json) => ({ type: SET_STORY_PROGRESS_SUCCESS, payload: json });
const setStoryProgressError = (error) => ({ type: SET_STORY_PROGRESS_ERROR, payload: error });

export function setStoryProgress(userId, storyId, progress) {
  return (dispatch) => {
    dispatch(setStoryProgressStart());
    return postStoryProgress(userId, storyId, progress)
      .then(json => {
        dispatch(setStoryProgressSuccess(json));
      }).catch((e) => {
        console.error(e);
        dispatch(setStoryProgressError(e.message));
      })
  };
}

const getStoryProgressStart = () => ({ type: GET_STORY_PROGRESS_START });
const getStoryProgressSuccess = (json) => ({ type: GET_STORY_PROGRESS_SUCCESS, payload: json });
const getStoryProgressError = (error) => ({ type: GET_STORY_PROGRESS_ERROR, payload: error });

export function getStoryProgress(userId, storyId) {
  return (dispatch) => {
    dispatch(getStoryProgressStart());
    return fetchStoryProgress(userId, storyId)
      .then(json => {
        dispatch(getStoryProgressSuccess(json));
      }).catch((e) => {
        console.error(e);
        dispatch(getStoryProgressError(e.message));
      })
  };
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
        const { activeStoryId, id } = json;
        if (activeStoryId)
          dispatch(getStoryProgress(id, activeStoryId));
      }).catch((e) => {
        console.error(e);
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

export function showNewChapterToggle(nextProgress) {
  return {
    type: SHOW_NEW_CHAPTER_TOGGLE,
    payload: {
      nextProgress
    }
  };
}

export function finishedStory() {
  return {
    type: FINISHED_STORY
  };
}
