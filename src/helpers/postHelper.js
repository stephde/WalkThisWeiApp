import { API_URL } from '../constants/url.js';
function postApi(path, body) {
  return fetch(API_URL + path, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (response.status < 200 || response.status >=300 ) {
        return Promise.reject(response)
      }
      else return response;
    })
    .then(response => response.json())
}

function deleteApi(path) {
  return fetch(API_URL + path, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
        console.log(response)
      if (response.status < 200 || response.status >=300 ) {
        return Promise.reject(response)
      }
      else return;
    })
}

export function postActiveStory(userId, activeStoryId) {
  return postApi(`/users/${userId}`, {activeStoryId});
}

export function postStoryProgress(userId, storyId, progressObject) {
  return postApi(`/users/${userId}/stories/${storyId}`, progressObject);
}

export function postLogin(deviceId, nickName) {
  return postApi('/login', {deviceId, nickName});
}

export function postUserLocation(userId, lat, long) {
  return postApi(`/users/${userId}/location`, {long, lat});
}

export function postNewContact(userId) {
  return postApi(`/users/${userId}/addContacts`, {userId});
}

export function postResetUser(userId) {
    return deleteApi(`/users/${userId}`, {userId});
}