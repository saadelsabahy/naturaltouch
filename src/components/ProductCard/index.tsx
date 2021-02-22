import React, {useContext, useState} from 'react';
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
import IncreaseAndDecreaseAmount from '../IncreaseAndDecrease';

export enum ChangeAmountEnum {
  INCREASE,
  DECREASE,
}
interface Props {
  saveText?: string;
  liked?: boolean;
  // onAddToFavouritePressed: () => void;
  images?: object[];
  productName: string;
  afterDiscountPrice?: string;
  price: string;
  rating: number;
  onProductPressed?: () => void;
  containerStyle?: ViewStyle;
  //onAddToCartPressed: () => void;
  id: string;
  quantity: number;
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
  quantity,
}: Props) => {
  const {t} = useTranslation();
  const [amount, setamount] = useState<number>(1);
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
    addedToCart
      ? removeCartItem(id, productName)
      : addToCart(id, productName, {}, amount);
  };
  const onChangeAmount = (type: ChangeAmountEnum) => {
    if (type == ChangeAmountEnum.INCREASE) {
      setamount((prev) => (amount < quantity ? prev + 1 : quantity));
    } else {
      setamount((prev) => (amount > 1 ? prev - 1 : 1));
    }
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
          autoplay={false}
        />
      </View>

      <View style={[styles.bodyContainer]}>
        <View style={[styles.productNameContainer]}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[styles.productName]}>
            {productName}
          </Text>
        </View>

        <View style={[styles.productPriceAndRatingContainer]}>
          <Rating rating={rating} starSize={30} maxStars={5} />
          <View style={[styles.priceContainer]}>
            {afterDiscountPrice && (
              <Text style={styles.beforeDiscountPrice}>
                {afterDiscountPrice}
              </Text>
            )}
            <Text style={styles.price}>{price}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <IconButton
          icon={addedToCart ? 'cart-off' : 'cart'}
          color={COLORS.WHITE}
          style={{backgroundColor: COLORS.MAINCOLOR}}
          onPress={onAddToCartPressed}
        />
        <IncreaseAndDecreaseAmount
          onChangeAmount={onChangeAmount}
          amount={amount}
          itemKey={+id}
        />
      </View>

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
    height: '50%',
    width: '100%',
    // backgroundColor: '#892',
  },
  bodyContainer: {
    flex: 1,
    width: '97%',
    height: '50%',
    alignSelf: 'center',
  },
  productNameContainer: {
    alignSelf: 'center',
    overflow: 'hidden',
    marginVertical: 3,
    alignItems: 'flex-start',
  },
  productName: {
    textTransform: 'capitalize',
  },
  productPriceAndRatingContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  beforeDiscountPrice: {
    textDecorationLine: 'line-through',
    color: COLORS.GRAY_LIGHT,
  },
  price: {
    textTransform: 'uppercase',
    fontSize: 18,
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
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
