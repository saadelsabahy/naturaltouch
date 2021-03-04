import React, {useState, useEffect, useCallback} from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {COLORS, COMMON_STYLES} from '../../constants/style';
import {
  ROUNDED_BORDER,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../constants/style/sizes';
import {CustomText} from '../customText';
import IncreaseAndDecreaseAmount from '../IncreaseAndDecrease';
import {ChangeAmountEnum} from '../ProductCard';
import {formatNumbers} from '../../utils';
import {Button, Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
interface Props {
  price: string;
  name: string;
  initialAmount?: number;
  onDeleteItemPressed: () => void;
  image: string;
  currency: string;
  amount: number;
  onItemPressed: () => void;

  onChangeAmount: (quantity: number, key: number) => void;
  itemKey: number;
  onRefresh: () => void;
}

const CartItem = ({
  price,
  initialAmount = 1,
  name,
  onDeleteItemPressed,
  image,
  currency,
  onItemPressed,
  amount,
  onChangeAmount,
  itemKey,
  onRefresh,
}: Props) => {
  const {t} = useTranslation();
  // const [amount, setamount] = useState<number>(initialAmount);

  /* const decreaseAmount = () =>{
    onChangeAmount()
    setamount((prev) => (prev != initialAmount ? prev - 1 : initialAmount))
  }
  const increaseAmount = () => {
    onChangeAmount()
    setamount((prev) => prev + 1)
  }; */

  /* useEffect(() => {
    if (initialAmount) {
      setamount(initialAmount);
    }
    return () => {};
  }, [initialAmount]); */
  const onChangeCartItemAmount = (type: ChangeAmountEnum) => {
    if (type == ChangeAmountEnum.INCREASE) {
      onChangeAmount(
        amount < initialAmount ? initialAmount : +amount + 1,
        itemKey,
      );
    } else {
      onChangeAmount(
        amount <= initialAmount ? initialAmount : +amount - 1,
        itemKey,
      );
    }
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
          <CustomText text={name} numberOfLines={3} />
        </View>
      </View>

      <IncreaseAndDecreaseAmount
        amount={amount}
        onChangeAmount={onChangeCartItemAmount}
        containerStyle={COMMON_STYLES.increaseDecreaseContainerNonCircular}
        circular={false}
        //quantity={+data.quantity!}
      />
      <View style={styles.priceContainer}>
        <View style={styles.priceandButtonContainer}>
          <View style={{justifyContent: 'flex-start'}}>
            <Text style={styles.priceTitle}>
              {t('categoriesDetailesScreen:price')}
            </Text>
            <Text>{price}</Text>
          </View>
          <Button
            onPress={onItemPressed}
            mode="outlined"
            style={{borderRadius: ROUNDED_BORDER, marginStart: 0}}>
            {t('general:edit')}
          </Button>
        </View>

        <View style={styles.priceandButtonContainer}>
          <View style={{justifyContent: 'flex-start'}}>
            <Text style={styles.priceTitle}>{t('cart:total')}</Text>
            <Text>{price}</Text>
          </View>
          <Button
            onPress={onDeleteItemPressed}
            mode="outlined"
            style={{borderRadius: ROUNDED_BORDER, marginStart: 0}}>
            {t('general:delete')}
          </Button>
        </View>
      </View>

      <Button
        mode="outlined"
        style={{width: '100%', borderRadius: ROUNDED_BORDER}}>
        {t('general:refresh', {name: t('tabs:cart')})}
      </Button>
    </Pressable>
  );
};

export {CartItem};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.97,
    height: SCREEN_HEIGHT * 0.7,
    backgroundColor: COLORS.WHITE,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 4,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    height: '30%',
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
    width: '90%',
    height: SCREEN_HEIGHT / 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
