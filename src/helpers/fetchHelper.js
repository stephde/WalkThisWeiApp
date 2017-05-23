import { API_URL } from '../constants/url.js';
import _ from 'lodash';

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

export function fetchStoryById(storyId) {
  const query = `/stories/${storyId}`;

  return getApi(query);
}

export function fetchStoriesByIds(storyIds) {
  const params = `ids=${
    _.reduce(
      storyIds,
      (acc, storyId, i) => {
        return i === 0
          ? storyId
          : acc + `,${storyId}`;
      }
    )
  }`;
  const query = `/stories?${params}`;

  return getApi(query);
}

export function fetchStoryProgress(userId, activeStoryId) {
  const query = `/users/${userId}/stories/${activeStoryId}`;

  return getApi(query);
}
