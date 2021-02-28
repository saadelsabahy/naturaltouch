import React, {useCallback, useContext, useState} from 'react';
import {View, Text} from 'react-native';
import {useQuery} from 'react-query';
import {endpoints} from '../constants/apiEndpoints.constants';
import {AuthenticationContext} from '../contexts';
import useAxios from './useAxios';
import RNRestart from 'react-native-restart';
import {FIRST_INSTALL} from '../contexts/AuthContext/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

interface Props {}

const useLanguage = () => {
  const Axios = useAxios();
  const {i18n} = useTranslation();
  const {
    state: {storeToken},
  } = useContext(AuthenticationContext);

  const onChageLanguage = useCallback(
    async (language: string) => {
      // const language_code = I18nManager.isRTL ? 'en' : 'ar';
      try {
        await Axios.post(endpoints.switchLanguage, {
          language_code: language,
          token: storeToken,
        });
        await AsyncStorage.setItem(FIRST_INSTALL, language);
        await i18n.changeLanguage(language);
      } catch (e) {
        console.log('switch lang error', e);
      }
    },
    [i18n],
  );

  return {onChageLanguage};
};

export {useLanguage};
