import React from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useQuery} from 'react-query';
import reactotron from 'reactotron-react-native';
import {
  CustomHeader,
  CustomText,
  EmptyList,
  Loader,
  MyordersCard,
} from '../../components';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT} from '../../constants/style/sizes';
import useAxios from '../../hooks/useAxios';

interface Props {}

const MyPurchases = ({navigation}: Props) => {
  const {t} = useTranslation();
  const Axios = useAxios();
  const onOrderPressed = (id: string, status: string) => {
    id && navigation.navigate('OrderDetailes', {id, status});
  };
  const getOrders = async () => {
    const allOrders = [];
    const {
      data: {orders},
    } = await Axios.post(endpoints.getOrderList);
    /* return orders.map(async (item) => {
      const {data} = await Axios.post(endpoints.getOrderInfo, {
        order_id: item.order_id,
      });
      if (!!data?.products?.length) {
        allOrders.push(data);
        return allOrders;
      }
    }); */
    return orders;
  };
  const {data, isLoading, isError, isFetching} = useQuery('orders', getOrders, {
    cacheTime: 0,
    staleTime: 0,
  });
  reactotron.log(data, isLoading);
  return (
    <View style={[styles.container]}>
      <CustomHeader title={t('accountScreen:myOrders')} />
      {isLoading && <Loader />}
      {data && (
        <FlatList
          data={data}
          keyExtractor={(_, index) => `${index}`}
          contentContainerStyle={{flexGrow: 1}}
          renderItem={({item, index}) => {
            return (
              <Pressable
                style={styles.orderCard}
                onPress={() => onOrderPressed(item.order_id, item.status)}>
                <CustomText
                  text={`${t('myPurchases:orderNumber')} : ${item.order_id}`}
                />

                <CustomText
                  text={`${t('myPurchases:orderDate')} : ${item.date_added}`}
                />

                <CustomText
                  text={`${t('myPurchases:numberOfProducts')} : ${
                    item.products
                  }`}
                />

                <CustomText
                  text={`${t('myPurchases:orderStatus')} : ${item.status}`}
                />
                <CustomText text={`${t('cart:total')} : ${item.total}`} />
              </Pressable>
            );
          }}
          ListEmptyComponent={<EmptyList />}
        />
      )}
    </View>
  );
};

export {MyPurchases};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  orderCard: {
    width: '95%',
    height: SCREEN_HEIGHT / 5,
    alignSelf: 'center',
    backgroundColor: COLORS.WHITE,
    padding: 5,
    justifyContent: 'space-evenly',
    marginVertical: 5,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
