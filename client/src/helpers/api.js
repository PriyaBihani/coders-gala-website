import { SERVICE_URL } from './../constants/utility';
import axios from 'axios';

const servicePost = async (path, payload, headers = null) => {
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

const serviceGet = async (path, payload) => {
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

export { servicePost, serviceGet };
