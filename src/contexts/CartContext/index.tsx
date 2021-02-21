import React, {useState, useCallback, ReactNode, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text} from 'react-native';
import {useQuery} from 'react-query';
import reactotron from 'reactotron-react-native';
import {endpoints} from '../../constants/apiEndpoints.constants';
import useAxios from '../../hooks/useAxios';
import {Product} from '../../interfaces';
import {AuthenticationContext} from '../AuthContext';
import {SnackBarContext} from '../SnackBarContext';

interface Props {
  children: ReactNode;
}
type getCartProductsResponseType =
  | {products: []; totals: {title: string; text: string}[]}
  | undefined;
interface productContextDefaultValue {
  addToCart: (id: string, name: string, options?: object) => void;
  cartProducts: getCartProductsResponseType;
  isCartLoading: boolean;
  getCartProductsError: boolean;
  isCartFetching: boolean;
  removeCartItem: (key: string, name: string) => void;
  onChangeAmount: (quantity: number, key: number) => void;
  reftchCart: () => void;
}
export const cartContext = React.createContext<productContextDefaultValue>({});
const CartProvider = ({children}: Props) => {
  const {
    state: {storeToken, settings},
  } = useContext(AuthenticationContext);
  const {showSnackbar} = useContext(SnackBarContext);
  reactotron.log({storeToken});
  const Axios = useAxios();
  const {t} = useTranslation();
  const [quantity, setquantity] = useState<number>(1);
  const getCartProducts = useCallback(async () => {
    const {
      data: {products, totals},
    } = await Axios.post(endpoints.cartProducts);
    return {products, totals};
  }, [storeToken]);

  const {data, isError, isLoading, refetch, isFetching} = useQuery(
    `getCartProducts`,
    getCartProducts,
    {
      staleTime: 0,
      cacheTime: 0,
      enabled: !!storeToken,
    },
  );

  const addToCart = useCallback(
    async (product_id, name, option) => {
      try {
        if (product_id) {
          const {
            data: {status},
          } = await Axios.post(endpoints.addToCart, {
            /* token: storeToken, */
            product: [
              {
                product_id,
                quantity,
                option,
              },
            ],
          });

          if (status == 'OK') {
            await refetch();
            product_id && showSnackbar(`${name} ${t('messages:addedToCart')}`);
          }
        }
      } catch (error) {
        console.log('add to cart error', error);
      }
    },
    [storeToken],
  );

  const removeCartItem = useCallback(
    async (key: string) => {
      try {
        await Axios.post(endpoints.removeFromCart, {
          key /* token: storeToken */,
        });
        await refetch();
      } catch (error) {
        console.log('remove cart item error', error);
      }
    },
    [storeToken],
  );
  const onChangeAmount = async (quantity: number, key: number) => {
    try {
      await Axios.post(endpoints.editCart, {
        quantity,
        key /* token: storeToken */,
      });
      await refetch();
    } catch (error) {}
  };
  return (
    <cartContext.Provider
      value={{
        cartProducts: data,
        isCartLoading: isLoading,
        getCartProductsError: isError,
        reftchCart: refetch,
        removeCartItem,
        isCartFetching: isFetching,
        onChangeAmount,
        addToCart,
      }}>
      {children}
    </cartContext.Provider>
  );
};

export {CartProvider};
