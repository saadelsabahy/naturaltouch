import React, {useState, useEffect, useCallback, useContext} from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {COLORS, COMMON_STYLES} from '../../constants/style';
import {
  ROUNDED_BORDER,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../constants/style/sizes';
import {CustomText} from '../customText';
import {ChangeAmountEnum} from '../ProductCard';
import {formatNumbers} from '../../utils';
import {Button, Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {cartContext, FavouritesContext} from '../../contexts';
interface Props {
  price: string;
  name: string;
  initialAmount?: number;
  image: string;
  currency: string;
  amount: number;
  onItemPressed: () => void;
  id: string;
  onRefresh: () => void;
}

const WhishlistItem = ({
  price,
  initialAmount = 1,
  name,
  image,
  currency,
  onItemPressed,
  id,
  onRefresh,
}: Props) => {
  const {t} = useTranslation();
  const [amount, setamount] = useState<string>(`${initialAmount}`);
  const {addToCart} = useContext(cartContext);
  const {removeFromFavourites} = useContext(FavouritesContext);
  const onChangeCartItemAmount = (text: string) => {
    setamount(text == '0' ? '1' : text);
  };

  const onDeleteItemPressed = () => {
    removeFromFavourites(id);
  };
  const onAddToCart = async () => {
    addToCart(id!, name!, {}, +amount);
    removeFromFavourites(id);
  };
  return (
    <Pressable style={[styles.container]} onPress={onItemPressed}>
      <View style={[styles.imageContainer]}>
        <FastImage
          source={{
            uri: image,
          }}
          style={[styles.image]}
          resizeMode={FastImage.resizeMode.stretch}
        />

        <View style={[styles.itemNameContainer]}>
          <Text numberOfLines={3}>{name}</Text>
          <Text>{price}</Text>
        </View>
      </View>

      <View style={styles.inputAndButtonContainer}>
        <TextInput
          style={[COMMON_STYLES.counterInput, styles.amountInput]}
          value={amount}
          onChangeText={onChangeCartItemAmount}
          keyboardType="numeric"
        />
        <Button
          mode="contained"
          style={{borderRadius: ROUNDED_BORDER, marginStart: 0, width: '45%'}}
          labelStyle={{color: COLORS.WHITE}}
          onPress={onAddToCart}>
          {t('categoriesDetailesScreen:addToCart')}
        </Button>
      </View>

      <View style={styles.priceContainer}>
        <View style={styles.priceandButtonContainer}>
          <Button
            onPress={onItemPressed}
            mode="outlined"
            style={{borderRadius: ROUNDED_BORDER, marginStart: 0}}>
            {t('general:edit')}
          </Button>
        </View>

        <View style={styles.priceandButtonContainer}>
          <Button
            onPress={onDeleteItemPressed}
            mode="outlined"
            style={{borderRadius: ROUNDED_BORDER, marginStart: 0}}>
            {t('general:delete')}
          </Button>
        </View>
      </View>
    </Pressable>
  );
};

export {WhishlistItem};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.97,
    height: SCREEN_HEIGHT * 0.4,
    backgroundColor: COLORS.WHITE,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    overflow: 'hidden',
    borderTopWidth: 0.5,
    borderColor: COLORS.GRAY,
    paddingVertical: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1,
    width: '100%',
    marginBottom: 5,
    //backgroundColor: 'red',
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    //backgroundColor: 'red',
  },
  itemDetailesContainer: {
    flex: 1,
    paddingStart: 5,
  },
  detailesTopContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemNameContainer: {
    width: '60%',
    alignItems: 'flex-start',
  },
  deleteIconContainer: {
    backgroundColor: COLORS.GRAY_LIGHT,
    padding: 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  detailesBottomContainer: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#ccc',
  },
  priceTitle: {
    color: COLORS.MAINCOLOR,
    marginBottom: 5,
  },
  counterAndPriceContainer: {
    backgroundColor: COLORS.GRAY_LIGHT,
    borderTopStartRadius: 5,
    borderBottomStartRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  priceContainer: {
    flex: 1,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceandButtonContainer: {
    flex: 1,
    marginEnd: 10,
    justifyContent: 'space-between',
  },
  price: {
    color: COLORS.MAINCOLOR,
    textTransform: 'uppercase',
  },
  counterSignContainer: {
    backgroundColor: COLORS.GRAY,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterSignIcon: {
    padding: 4,
  },
  inputAndButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: '90%',
    justifyContent: 'space-evenly',
  },
  amountInput: {
    borderWidth: 0.5,
    borderColor: COLORS.GRAY,
    width: '15%',
    height: '40%',
    flex: 0,
    marginEnd: 10,
  },
});
