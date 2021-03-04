import React, {useContext, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {ChangeAmountEnum} from '../../../components';
import IncreaseAndDecreaseAmount from '../../../components/IncreaseAndDecrease';
import {COLORS, COMMON_STYLES} from '../../../constants/style';
import {ROUNDED_BORDER} from '../../../constants/style/sizes';
import {cartContext} from '../../../contexts';
import {Product} from '../../../interfaces';

interface Props {
  id: string;
  data: Product;
  selectedProductOptions: object;
}

const IncreaseAndAddToCart = ({id, data, selectedProductOptions}: Props) => {
  const {t} = useTranslation();
  const [amount, setamount] = useState<number>(1);

  const {addToCart, removeCartItem, cartProducts} = useContext(cartContext);
  const addedToCart = useMemo(
    () =>
      [
        ...new Set(
          cartProducts?.products?.map((item: Product) => item.product_id),
        ),
      ].includes(id),
    [id, cartProducts?.products.length],
  );
  const onChangeAmount = (type: ChangeAmountEnum) => {
    if (type == ChangeAmountEnum.INCREASE) {
      setamount((prev) =>
        amount < +data.quantity! ? prev + 1 : +data.quantity!,
      );
    } else {
      setamount((prev) => (amount > 1 ? prev - 1 : 1));
    }
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.GRAY_LIGHT,
        paddingVertical: 5,
      }}>
      <IncreaseAndDecreaseAmount
        amount={amount}
        onChangeAmount={onChangeAmount}
        containerStyle={COMMON_STYLES.increaseDecreaseContainerNonCircular}
        circular={false}
        quantity={+data.quantity!}
      />
      <Button
        mode={'contained'}
        style={[styles.button]}
        labelStyle={{color: COLORS.WHITE}}
        onPress={() =>
          addedToCart
            ? removeCartItem(data.product_id!, data.name!)
            : addToCart(
                data.product_id!,
                data.name!,
                selectedProductOptions!,
                amount,
              )
        }>
        {addedToCart
          ? t('categoriesDetailesScreen:removeFromCart')
          : t('categoriesDetailesScreen:addToCart')}
      </Button>
    </View>
  );
};

export {IncreaseAndAddToCart};

const styles = StyleSheet.create({
  button: {
    flex: 0.8,
    borderTopStartRadius: ROUNDED_BORDER,
    borderBottomStartRadius: ROUNDED_BORDER,
    borderRadius: ROUNDED_BORDER,
    backgroundColor: COLORS.MAINCOLOR,
  },
});
