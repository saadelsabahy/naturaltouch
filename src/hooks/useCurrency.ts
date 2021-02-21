import React, {useCallback, useContext, useState} from 'react';
import {View, Text} from 'react-native';
import {useQuery} from 'react-query';
import {endpoints} from '../constants/apiEndpoints.constants';
import {AuthenticationContext} from '../contexts';
import useAxios from './useAxios';
import RNRestart from 'react-native-restart';
import {USER_TOKEN} from '../contexts/AuthContext/types';
interface Props {}

const useCurrency = () => {
  const [selectedCurrency, setselectedCurrency] = useState<string>('');
  const Axios = useAxios();
  const {
    state: {storeToken},
  } = useContext(AuthenticationContext);
  const getCurrencies = useCallback(async () => {
    const {
      data: {currencies},
    } = await Axios.post(endpoints.getCurrencies);
    return currencies;
  }, []);
  const {data: currencies, isLoading, isError} = useQuery(
    'getCurrncies',
    getCurrencies,
  );

  const getCurrentCurrency = useCallback(async () => {
    const {
      data: {currency},
    } = await Axios.post(
      endpoints.getCurrentCurrency /* {token: storeToken} */,
    );
    return currency;
  }, []);
  const {data: currentCurrency, refetch: refetchCurrentCurrency} = useQuery(
    'getCurrntCurrenct',
    getCurrentCurrency,
    {
      onSuccess: (data) => setselectedCurrency(data),
      cacheTime: 0,
      staleTime: 0,
      enabled: !!USER_TOKEN,
    },
  );
  const changeCurrency = useCallback(async (currency_code: string) => {
    try {
      // setselectedCurrency(currency_code);
      await Axios.post(endpoints.switchCurrency, {
        currency_code,
        token: storeToken,
      });
      refetchCurrentCurrency();
      /* RNRestart.Restart(); */
    } catch (error) {
      console.log('change currency error', error);
    }
  }, []);
  return {currencies, changeCurrency, selectedCurrency};
};

export {useCurrency};
