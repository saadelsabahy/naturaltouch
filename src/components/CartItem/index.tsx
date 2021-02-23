import React, {useState, useEffect, useCallback} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import {CustomText} from '../customText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IncreaseAndDecreaseAmount from '../IncreaseAndDecrease';
import {ChangeAmountEnum} from '../ProductCard';
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
}: Props) => {
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
      </View>

      <View style={[styles.itemDetailesContainer]}>
        <View style={[styles.detailesTopContainer]}>
          <View style={[styles.itemNameContainer]}>
            <CustomText text={name} numberOfLines={2} />
          </View>

          <Pressable
            style={({pressed}) => [
              styles.deleteIconContainer,
              {opacity: pressed ? 0.7 : 1},
            ]}
            onPress={onDeleteItemPressed}>
            <Icon name="close" size={20} color={COLORS.MAINCOLOR} />
          </Pressable>
        </View>

        <View style={[styles.detailesBottomContainer]}>
          <View style={[styles.counterAndPriceContainer]}>
            <View style={[styles.priceContainer]}>
              {price && <CustomText text={price} textStyle={styles.price} />}
            </View>
            <IncreaseAndDecreaseAmount
              amount={amount}
              onChangeAmount={onChangeCartItemAmount}
            />
            {/*  <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <Pressable
                style={({pressed}) => [
                  styles.counterSignContainer,
                  {opacity: pressed ? 0.7 : 1},
                ]}
                onPress={() =>
                  onChangeAmount(
                    amount <= initialAmount ? initialAmount : +amount - 1,
                    itemKey,
                  )
                }>
                <Icon
                  name="minus"
                  size={20}
                  color={COLORS.WHITE}
                  style={styles.counterSignIcon}
                />
              </Pressable>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomText
                  text={`${amount}`}
                  textStyle={{color: COLORS.MAINCOLOR}}
                />
              </View>
              <Pressable
                style={({pressed}) => [
                  styles.counterSignContainer,
                  {opacity: pressed ? 0.7 : 1},
                ]}
                onPress={() =>
                  onChangeAmount(
                    amount < initialAmount ? initialAmount : +amount + 1,
                    itemKey,
                  )
                }>
                <Icon
                  name="plus-thick"
                  size={20}
                  color={COLORS.WHITE}
                  style={styles.counterSignIcon}
                />
              </Pressable>
            </View> */}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export {CartItem};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.97,
    height: SCREEN_HEIGHT / 5,
    backgroundColor: COLORS.WHITE,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 4,
  },
  imageContainer: {
    width: '30%',
    height: '100%',
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
    width: '80%',
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
    width: '50%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 5,
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
