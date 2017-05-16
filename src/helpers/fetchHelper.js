import { API_URL } from '../constants/url.js';

function getApi(path) {
  return fetch(API_URL + path)
    .then(response => {
      if (response.status < 200 || response.status >=300 )
        return Promise.reject(new Error('Error! Response Status not 2xx'))
      else return response;
    })
    .then(response => response.json())
}

export function fetchUserById(userId) {
  const query = `/users/${userId}`;

  return getApi(query);
}

export function fetchStoriesByLocation(latitude, longitude, categories = null) {
  let query = `/stories?lat=${latitude}&long=${longitude}`;

  if(categories && categories.length > 0)
    query += `&categories=${categories}`;

  return getApi(query);
}

export function fetchStoriesById(storyId) {
  const query = `/stories/${storyId}`;

  return getApi(query);
}

export function fetchStoryProgress(userId, activeStoryId) {
  const query = `/users/${userId}/stories/${storyId}`;

  return getApi(query);
}
