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

export function postActiveStory(userId, activeStoryId) {
  return postApi(`/users/${userId}`, {activeStoryId});
}

export function postStoryProgress(userId, storyId, progressObject) {
  return postApi(`/users/${userId}/stories/${storyId}`, progressObject);
}

export function postLogin(deviceId, phoneNumber) {
  return postApi('/login', {deviceId, phoneNumber});
}
