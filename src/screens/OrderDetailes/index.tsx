import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import reactotron from 'reactotron-react-native';
import {CustomHeader, Loader, MyordersCard} from '../../components';
import {endpoints} from '../../constants/apiEndpoints.constants';
import useAxios from '../../hooks/useAxios';

interface Props {}

const OrderDetailes = ({route}: Props) => {
  const {id, status} = route?.params;
  reactotron.log(id, status);
  const {t} = useTranslation();
  const Axios = useAxios();
  const getOrderInfo = async () => {
    const {data} = await Axios.post(endpoints.getOrderInfo, {
      order_id: id,
    });

    return data;
  };
  const {data, isLoading, isError, isFetching} = useQuery(
    `orderInfo${id}`,
    getOrderInfo,
    {
      cacheTime: 0,
      staleTime: 0,
      enabled: !!id,
    },
  );
  return (
    <View style={[styles.container]}>
      <CustomHeader title={id} />
      {isLoading && <Loader />}
      {data && (
        <FlatList
          data={data?.products}
          keyExtractor={(_, index) => `${index}`}
          renderItem={({item, index}) => {
            return (
              <MyordersCard
                name={item.name}
                image={item.image}
                status={`${t('myPurchases:orderStatus')} : ${status}`}
                manufacturer={`${t('myPurchases:manufacturer')} : ${
                  item.manufacturer
                }`}
                quantity={`${t('myPurchases:quantity')} : ${item.quantity}`}
                price={`${t('categoriesDetailesScreen:price')} : ${item.total}`}
                orderDate={`${t('myPurchases:orderDate')} : ${data.date_added}`}
              />
            );
          }}
        />
      )}
    </View>
  );
};

export {OrderDetailes};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
