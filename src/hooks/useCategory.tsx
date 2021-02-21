import React from 'react';
import {View, Text} from 'react-native';
import {useQuery} from 'react-query';
import {endpoints} from '../constants/apiEndpoints.constants';
import useAxios from './useAxios';

interface Props {}

const useCategory = () => {
  const Axios = useAxios();
  const getCategories = async () => {
    const {
      data: {Categories},
    } = await Axios.post(endpoints.categories);
    return Categories;
  };
  const {isLoading, refetch, data, error} = useQuery(
    'categoriesRequest',
    getCategories,
  );

  return {isLoading, refetch, data, error};
};

export default useCategory;
