import { API_URL } from '../constants/url.js';
function postApi(path, body) {
  return fetch(API_URL + path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)})
    .then(response => {
      if (response.status < 200 || response.status >=300 )
        return Promise.reject(new Error('Error! Response Status not 2xx'))
      else return response;
    })
    .then(response => response.json())
}

export function postLogin(deviceId, phone) {
  return postApi('/login', {deviceId: deviceId, phoneNumber: phone});
}
