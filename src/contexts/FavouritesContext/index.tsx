import {useNavigation} from '@react-navigation/native';
import React, {ReactNode, useCallback, useContext} from 'react';
import {View, Text} from 'react-native';
import {useQuery} from 'react-query';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {AuthenticationContext} from '..';
import useAxios from '../../hooks/useAxios';
import {Product} from '../../interfaces';

interface ContextTypes {
  loadingFavourite: boolean;
  getFavouritesError: boolean;
  favourites: [];
  fetchingFavourites: boolean;
  reftchFavourites: () => void;
  addToFavourites: (id: string) => void;
  removeFromFavourites: (item: string) => void;
}
interface Props {
  children: ReactNode;
}
export const FavouritesContext = React.createContext<ContextTypes>({});
const FavouritesProvider = ({children}: Props) => {
  const Axios = useAxios();
  const {
    state: {storeToken},
  } = useContext(AuthenticationContext);

  const getFavourites = useCallback(async () => {
    const {
      data: {products},
    } = await Axios.post(endpoints.getWishList);
    return products;
  }, [storeToken]);
  const {
    isLoading: loadingFavourite,
    isError: getFavouritesError,
    data: favourites,
    isFetching: fetchingFavourites,
    refetch: reftchFavourites,
  } = useQuery(`getFavourites`, getFavourites, {enabled: !!storeToken});

  const addToFavourites = useCallback(
    async (product_id: string) => {
      console.log(product_id);
      try {
        await Axios.post(endpoints.addToWishList, {product_id});
        await reftchFavourites();
      } catch (error) {
        console.log('add to favourite error', error);
      }
    },
    [storeToken],
  );

  const removeFromFavourites = useCallback(
    async (product_id: string) => {
      console.log(product_id);
      try {
        await Axios.post(endpoints.removeFromWishList, {product_id});
        await reftchFavourites();
      } catch (error) {
        console.log('remove from favourite error', error);
      }
    },
    [storeToken],
  );
  return (
    <FavouritesContext.Provider
      value={{
        loadingFavourite,
        getFavouritesError,
        favourites,
        fetchingFavourites,
        reftchFavourites,
        addToFavourites,
        removeFromFavourites,
      }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export {FavouritesProvider};
