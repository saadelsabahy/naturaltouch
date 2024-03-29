import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {IconButton} from 'react-native-paper';
import {
  CategoryNameAndAvatar,
  CategorySubHeader,
  CustomHeader,
  CustomModal,
  CustomText,
  EmptyList,
  FilterList,
  FlatlistWithCustomScrollIndicator,
  Loader,
  ProductCard,
  SortItemsList,
  WhishlistItem,
} from '../../components';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import {cartContext} from '../../contexts';
import {FavouritesContext} from '../../contexts';
import {Product} from '../../interfaces';
import {FilterSelectedItemes} from '../../interfaces/categories';

interface Props {}

const Favourites = ({navigation}: Props) => {
  const [visible, setvisible] = React.useState('');
  const {t} = useTranslation();
  const {
    favourites,
    fetchingFavourites,
    getFavouritesError,
    loadingFavourite,
    reftchFavourites,
  } = useContext(FavouritesContext);

  const onProductPressed = (id: string | undefined) => {
    id &&
      navigation.navigate('ProductStack', {
        screen: 'Product',
        params: {id},
      });
  };
  const renderProductCardItem = ({item}) => {
    return (
      <WhishlistItem
        onItemPressed={() => onProductPressed(item.product_id)}
        name={item.name}
        image={item.image}
        price={`${item.price}`.trim()}
        onRefresh={() => reftchFavourites()}
        id={item.product_id}
      />
      /*    <ProductCard
        onProductPressed={() => onProductPressed(item.product_id)}
        containerStyle={{
          width: '50%',
        }}
        productName={item.name}
        images={[{slideimage: item.image}]}
        rating={item?.rating}
        price={`${item.price}`.trim()}
        id={item.product_id}
      /> */
    );
  };
  return (
    <View style={{flex: 1}}>
      <CustomHeader />

      <View style={styles.listContainer}>
        {loadingFavourite && <Loader />}
        {!!favourites && (
          <FlatlistWithCustomScrollIndicator
            data={favourites}
            keyExtractor={(item, index: number) => `${item.product_id}`}
            renderItem={renderProductCardItem}
            refresh={fetchingFavourites}
            onPullToRefresh={() => reftchFavourites()}
            ListEmptyComponent={
              <EmptyList emptyText={t('favouriteScreen:emptyText')} />
            }
          />
        )}
      </View>
    </View>
  );
};

export {Favourites};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: '99%',
    alignSelf: 'center',
  },
  listContentContainer: {
    /* flexGrow: 1,
    alignItems: 'center',

    backgroundColor: '#549', */
  },
});
