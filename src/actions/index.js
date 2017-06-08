import {
  fetchStoriesByLocation,
  fetchStoryById,
  fetchStoriesByIds,
  fetchUserById,
  fetchStoryProgress,
  fetchContacts
} from '../helpers/fetchHelper.js';
import {
  postLogin,
  postActiveStory,
  postStoryProgress,
  postUserLocation,
  postNewContact,
  postResetUser
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
  REACHED_SUBCHAPTER,
  SHOW_NEW_CHAPTER_TOGGLE,
  FINISHED_STORY,
  WRITE_CHARACTERISTIC,
  COMPLETE_OPERATION,
  IS_CONNECTED_TO_DEVICE,
  IS_NOT_CONNECTED_TO_DEVICE,
  SET_DEVICE_ID,
  DISCONNECT_WEARABLE,
  IS_BLUETOOTH_ON,
  USER_LOCATION_START,
  USER_LOCATION_SUCCESS,
  USER_LOCATION_ERROR,
  CHANGE_STATUS_OF_LED,
  OPEN_PLAYER,
  PLAYER_OPENED,
  CONTROL_PLAYER,
  HANDLED_PLAYER_PRESS,
  CLOSE_PLAYER,
  GET_CONTACTS_START,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_ERROR,
  ADD_CONTACT,
  ADD_NEW_CONTACT_START,
  ADD_NEW_CONTACT_SUCCESS,
  ADD_NEW_CONTACT_ERROR,
  UNSET_NEW_CONTACT,
  RESET_USER,
  RESET_USER_SUCCESS,
  RESET_USER_ERROR
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
        console.log(e);
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
        console.log(e);
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
        console.log(e);
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
        console.log(e);
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
        console.log(e);
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
        console.log(e);
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
        console.log(e);
        dispatch(getStoryProgressError(e.message));
      })
  };
}

const loginStart = () => ({ type: LOGIN_START });
const loginSuccess = (json) => ({ type: LOGIN_SUCCESS, payload: json });
const loginError = (error) => ({ type: LOGIN_ERROR, payload: error });

export function login(deviceId, nickName) {
  return (dispatch) => {
    dispatch(loginStart());
    return postLogin(deviceId, nickName)
      .then(json => {
        dispatch(loginSuccess(json));
        const { activeStoryId, id } = json;
        if (activeStoryId)
          dispatch(getStoryProgress(id, activeStoryId));
      }).catch((e) => {
        console.log(e);
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

const sendUserLocationStart = () => ({ type: USER_LOCATION_START });
const sendUserLocationSuccess = (json) => ({ type: USER_LOCATION_SUCCESS, payload: json });
const sendUserLocationError = (error) => ({ type: USER_LOCATION_ERROR, payload: error });

export function sendUserLocation(user, longitude, latitude, info) {
  return (dispatch) => {
      dispatch(sendUserLocationStart());
      return postUserLocation(user, latitude, longitude)
        .then(json => {
          dispatch(sendUserLocationSuccess(json));
        }).catch((e) => {
          console.log(e);
          dispatch(sendUserLocationError(e));
        });
    }
}

export function setUserLocation(latitude, longitude, info) {
  return {
    type: SET_USER_LOCATION,
    payload: {
      latitude: latitude,
      longitude: longitude,
      info
    }
  };
}

export function reachedSubChapter(chapterIndex, subChapterIndex) {
  return {
    type: REACHED_SUBCHAPTER,
    payload: {
      chapterIndex,
      subChapterIndex
    }
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

export function writeCharacteristic(command) {
  return {
    type: WRITE_CHARACTERISTIC,
    payload: {
      type: 'write',
      command: command
    }
  }
}

export function completeOperation() {
  return {
    type: COMPLETE_OPERATION
  }
}

export function connectToDevice() {
  return {
    type: IS_CONNECTED_TO_DEVICE
  }
}

export function disconnectDevice() {
  return {
    type: IS_NOT_CONNECTED_TO_DEVICE
  }
}

export function turnVibrationOn() {
  return writeCharacteristic("F01");
}

export function turnVibrationAndLEDOn() {
  return writeCharacteristic("F021");
}

export function turnVibrationAndLEDOff() {
  return writeCharacteristic("F020");
}

export function triggerShortVibration() {
  return writeCharacteristic("F05");
}

export function setDeviceId(deviceId) {
  return {
    type: SET_DEVICE_ID,
    payload: {
      deviceId: deviceId
    }
  }
}

export function disconnectWearable() {
  return {
    type: DISCONNECT_WEARABLE,
    payload: {
      type: 'disconnect',
    }
  }
}

export function isBluetoothOn(isBluetoothOn) {
  return {
    type: IS_BLUETOOTH_ON,
    payload: {
      isBluetoothOn: isBluetoothOn
    }
  }
}

export function storeNewStatus(command) {
   return {
     type: CHANGE_STATUS_OF_LED,
     payload: {
       isLEDOn: command[command.length - 1] === "1"
     }
   };
 }

 export function openPlayer(annotationIndex) {
    return {
      type: OPEN_PLAYER,
      payload: {
        annotationIndex: annotationIndex
      }
    };
  }

  export function openedPlayer() {
    return {
      type: PLAYER_OPENED
    };
  }

  export function controlPlayer() {
    return {
      type: CONTROL_PLAYER
    };
  }

  export function handledPlayerButtonPress() {
    return {
      type: HANDLED_PLAYER_PRESS
    };
  }

  export function closePlayer() {
    return {
      type: CLOSE_PLAYER
    };
  }

  const getContactsStart = () => ({ type: GET_CONTACTS_START });
  const getContactsSuccess = (json) => ({ type: GET_CONTACTS_SUCCESS, payload: json });
  const getContactsError = (error) => ({ type: GET_CONTACTS_ERROR, payload: error });

  export function getContacts(userId) {
    return (dispatch) => {
      dispatch(getContactsStart());
      return fetchContacts(userId)
        .then(json => {
          dispatch(getContactsSuccess(json));
        }).catch((e) => {
          console.log(e);
          dispatch(getContactsError(e));
        });
    };
  }

  export function addContact() {
    return {
      type: ADD_CONTACT
    };
  }

  const addNewContactStart = () => ({ type: ADD_NEW_CONTACT_START });
  const addNewContactSuccess = (json) => ({ type: ADD_NEW_CONTACT_SUCCESS, payload: json });
  const addNewContactError = (error) => ({ type: ADD_NEW_CONTACT_ERROR, payload: error });

  export function addNewContact(userId) {
    return (dispatch) => {
      dispatch(addNewContactStart());
      return postNewContact(userId)
        .then(json => {
          dispatch(addNewContactSuccess(json));
        }).catch((e) => {
          console.log(e);
          dispatch(addNewContactError(e));
        });
    };
  }

  export function hasSeenNewContact() {
    return {
      type: UNSET_NEW_CONTACT
    };
  }

const resetUserSuccess = () => ({ type: RESET_USER_SUCCESS})
const resetUserError = () => ({ type: RESET_USER_ERROR})

export function resetUser(userId) {
  return (dispatch) => {
    return postResetUser(userId)
        .then(() => {
          dispatch(resetUserSuccess())
        }).catch((e) => {
          console.log(e)
          dispatch(resetUserError(e))
        })
  }
}