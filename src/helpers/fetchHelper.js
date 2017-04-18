import { API_URL } from '../constants/url.js';

export function getApi(path) {
  return fetch(API_URL + path)
    .then(response => {
      if (response.status < 200 || response.status >=300 )
        return Promise.reject('Error')
      else return response;
    })
    .then(response => response.json())
}
