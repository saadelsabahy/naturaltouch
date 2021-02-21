import axios, {AxiosPromise} from 'axios';
import React from 'react';
import {API_PATH, STORE_URL} from '../constants/config.constants';
import {AuthenticationContext} from '../contexts/AuthContext';

interface Props {}

const useAxios = () => {
  const {
    state: {storeToken},
  } = React.useContext(AuthenticationContext);
  /*  console.log(storeToken); */

  const instance = axios.create({
    baseURL: STORE_URL + API_PATH,
    headers: {
      'Content-Type': 'application/json',
      timeout: 10000,
      common: {
        Authorization: storeToken,
      },
    },
    /* params: {
      token: storeToken,
    }, */
  });
  instance.interceptors.request.use(
    (config) => {
      config = {
        ...config,
        data: {...config.data, token: storeToken},
      };
      return config;
    },
    (error) => {
      console.log('interceptors error', error);

      return Promise.reject(error);
    },
  );
  return instance;
};

export default useAxios;
