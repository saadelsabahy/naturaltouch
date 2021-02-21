import React, {useContext} from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import {Button, IconButton, Text} from 'react-native-paper';
import {COLORS, COMMON_STYLES} from '../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import {CustomText} from '../customText';
import {Rating} from '../Rating';
import {SaveSign} from '../SaveSign';
import {CustomSwiper} from '../Swiper';
import {useTranslation} from 'react-i18next';
import {
  AuthenticationContext,
  cartContext,
  FavouritesContext,
} from '../../contexts';
import reactotron from 'reactotron-react-native';
import {useNavigation} from '@react-navigation/native';
interface Props {
  saveText?: string;
  liked?: boolean;
  // onAddToFavouritePressed: () => void;
  images?: object[];
  productName: string;
  afterDiscountPrice?: string;
  price: string;
  rating: number;
  onProductPressed: () => void;
  containerStyle: ViewStyle;
  //onAddToCartPressed: () => void;
  id: string;
}

const ProductCard = ({
  saveText,
  // liked,
  //onAddToFavouritePressed,
  images,
  productName,
  afterDiscountPrice,
  price,
  rating,
  onProductPressed,
  containerStyle,
  //onAddToCartPressed,
  id,
}: Props) => {
  const {t} = useTranslation();
  const {cartProducts, addToCart, removeCartItem} = useContext(cartContext);
  const {favourites, addToFavourites, removeFromFavourites} = useContext(
    FavouritesContext,
  );
  const {
    state: {userToken},
  } = useContext(AuthenticationContext);
  const navigation = useNavigation();
  const cartProductsIds = [
    ...new Set(cartProducts?.products?.map((item) => item.product_id)),
  ];
  const favouritesProductsIds = [
    ...new Set(favourites?.map((item) => item.product_id)),
  ];
  const liked = favouritesProductsIds.includes(id);
  const addedToCart = cartProductsIds.includes(id);

  const onAddToFavouritePressed = () => {
    if (!!userToken) {
      liked ? removeFromFavourites(id) : addToFavourites(id);
    } else {
      navigation.navigate('Auth', {screen: 'Login'});
    }
  };
  const onAddToCartPressed = () => {
    addedToCart ? removeCartItem(id, productName) : addToCart(id, productName);
  };
  return (
    <Pressable
      style={({}) => [styles.container, containerStyle]}
      onPress={onProductPressed}>
      <View style={styles.carsoulContainer}>
        <CustomSwiper
          images={images}
          product={true}
          onImagePressed={onProductPressed}
        />
      </View>

      <View style={[styles.bodyContainer]}>
        <View style={[styles.productNameContainer]}>
          <Text numberOfLines={2} style={[styles.productName]}>
            {productName}
          </Text>
        </View>

        <View style={[styles.productPriceAndRatingContainer]}>
          <Rating rating={rating} showRateNumber maxStars={5} />
          <View style={[styles.priceContainer]}>
            {afterDiscountPrice && (
              <CustomText
                text={afterDiscountPrice}
                textStyle={styles.beforeDiscountPrice}
              />
            )}
            <CustomText text={price} textStyle={styles.price} />
          </View>
        </View>
      </View>

      <Button
        mode="contained"
        style={[COMMON_STYLES.deleteBorderRadius]}
        labelStyle={styles.buttonLabel}
        onPress={onAddToCartPressed}>
        {addedToCart
          ? t('categoriesDetailesScreen:removeFromCart')
          : t('categoriesDetailesScreen:addToCart')}
      </Button>

      <View style={[styles.absoluteRow]}>
        <SaveSign text={saveText} />
        <IconButton
          icon={liked ? 'heart' : 'heart-outline'}
          onPress={onAddToFavouritePressed}
          color={COLORS.MAINCOLOR}
        />
      </View>
    </Pressable>
  );
};

export {ProductCard};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 2 - 15,
    height: SCREEN_HEIGHT / 2,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
    marginEnd: 5,
    marginBottom: 5,
    overflow: 'hidden',
  },
  carsoulContainer: {
    height: '60%',
    width: '100%',
    // backgroundColor: '#892',
  },
  bodyContainer: {
    flex: 1,
    width: '97%',
    height: '35%',
    alignSelf: 'center',
  },
  productNameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  productName: {
    textTransform: 'capitalize',
  },
  productPriceAndRatingContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  priceContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginEnd: 3,
  },
  beforeDiscountPrice: {
    textDecorationLine: 'line-through',
    color: COLORS.GRAY_LIGHT,
  },
  price: {
    textTransform: 'uppercase',
  },
  absoluteRow: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //top: 5,
    position: 'absolute',
  },
  buttonLabel: {
    color: COLORS.WHITE,
  },
  addToCardButton: {
    borderRadius: 0,
  },
});
