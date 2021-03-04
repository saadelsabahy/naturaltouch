import {useFocusEffect} from '@react-navigation/native';
import React, {useContext, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Linking, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import {
  CartFooter,
  CartItem,
  CustomHeader,
  EmptyList,
  FlatlistWithCustomScrollIndicator,
  Loader,
} from '../../components';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {STORE_URL} from '../../constants/config.constants';
import {COLORS} from '../../constants/style';
import {AuthenticationContext, cartContext} from '../../contexts';
import useAxios from '../../hooks/useAxios';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import reactotron from 'reactotron-react-native';

interface Props {}
const checkOut = 'index.php?route=checkout/checkout&token=';
const Cart = ({navigation}: Props) => {
  const {t} = useTranslation();
  const {
    cartProducts,
    isCartLoading,
    getCartProductsError,
    reftchCart,
    removeCartItem,
    onChangeAmount,
    isCartFetching,
  } = useContext(cartContext);
  const {
    state: {storeToken},
  } = useContext(AuthenticationContext);
  const [refresh, setrefresh] = useState(false);

  const onPullToRefresh = async () => {
    // setrefresh(true);
    reftchCart();
    // setrefresh(false);
  };
  const checkOutUrl = useMemo(() => STORE_URL + '/' + checkOut + storeToken, [
    storeToken,
  ]);
  const onBayPressed = React.useCallback(async () => {
    // reactotron.log(checkOutUrl);

    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(checkOutUrl, {
          // preferredBarTintColor: mainColor,
          // toolbarColor: mainColor,
          // preferredControlTintColor: mainColor,
          // iOS Properties
          ephemeralWebSession: false,
          // Android Properties
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        });
      } else {
        await Linking.openURL(checkOutUrl);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      reftchCart();

      return () => {};
    }, []),
  );
  const onItemPressed = (productId: string) => {
    navigation.navigate('ProductStack', {
      screen: 'Product',
      params: {id: productId},
    });
  };
  return (
    <View style={[styles.container]}>
      <CustomHeader search={false} title={t('tabs:cart')} />
      {isCartLoading && <Loader />}
      {cartProducts && (
        <>
          <View style={{flex: 1}}>
            <FlatlistWithCustomScrollIndicator
              contentContainerStyle={{flexGrow: 1}}
              refresh={isCartFetching}
              onPullToRefresh={onPullToRefresh}
              data={cartProducts?.products}
              keyExtractor={(item, index) => `${index}`}
              indicatorColor={COLORS.GRAY}
              renderItem={({
                item: {
                  name,
                  quantity,
                  float_price,
                  float_total,
                  currency,
                  image,
                  key,
                  total,
                  product_id,
                },
                index,
              }) => {
                return (
                  <CartItem
                    name={name}
                    // initialAmount={quantity}
                    price={total.replace(currency, '').trim()}
                    image={image}
                    currency={currency}
                    onDeleteItemPressed={() => removeCartItem(`${key}`, name)}
                    onChangeAmount={onChangeAmount}
                    amount={quantity}
                    itemKey={key}
                    onItemPressed={() => onItemPressed(product_id)}
                    onRefresh={() => reftchCart()}
                  />
                );
              }}
              ListEmptyComponent={<EmptyList emptyText={t('cart:emptyText')} />}
            />
          </View>
        </>
      )}
    </View>
  );
};

export {Cart};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
