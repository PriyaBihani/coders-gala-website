import { SERVICE_URL } from './';
import axios from 'axios';

export const servicePost = async (path, payload, headers = null) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${SERVICE_URL}/${path}`, payload, {
        headers: headers,
      })
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export const serviceGet = async (path, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${SERVICE_URL}/${path}`, payload)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
