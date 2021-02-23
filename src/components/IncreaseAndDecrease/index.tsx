import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {SCREEN_WIDTH} from '../../constants/style/sizes';
import {formatNumbers} from '../../utils';
import {CustomText} from '../customText';
import {ChangeAmountEnum} from '../ProductCard';
interface Props {
  amount: number;
  onChangeAmount: (type: ChangeAmountEnum) => void;
  itemKey?: number;
  initialAmount?: number;
  quantity?: number;
}

const IncreaseAndDecreaseAmount = ({
  amount,
  onChangeAmount,
  initialAmount = 1,
  itemKey,
  quantity,
}: Props) => {
  return (
    <View style={styles.container}>
      <IconButton
        icon="minus"
        size={25}
        color={COLORS.MAINCOLOR}
        style={[
          styles.counterSignIcon,
          {opacity: amount == initialAmount ? 0.2 : 1},
        ]}
        onPress={() => onChangeAmount(ChangeAmountEnum.DECREASE)}
        disabled={amount == initialAmount}
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          editable={false}
          value={`${formatNumbers(amount)}`}
          style={styles.input}
        />
        {/* <CustomText text={`${amount}`} textStyle={{color: COLORS.MAINCOLOR}} /> */}
      </View>

      <IconButton
        icon="plus-thick"
        size={25}
        color={COLORS.MAINCOLOR}
        style={[
          styles.counterSignIcon,
          {opacity: amount == quantity ? 0.2 : 1},
        ]}
        onPress={() => onChangeAmount(ChangeAmountEnum.INCREASE)}
        disabled={amount == quantity}
      />
    </View>
  );
};

export default IncreaseAndDecreaseAmount;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: SCREEN_WIDTH / 3.4,
  },
  counterSignIcon: {
    borderWidth: 1,
    borderColor: COLORS.MAINCOLOR,
  },
  input: {
    textTransform: 'capitalize',
    paddingHorizontal: 0,
    fontFamily: 'Cairo-Regular',
    color: COLORS.MAINCOLOR,
    flex: 1,
    textAlign: 'center',
  },
});
