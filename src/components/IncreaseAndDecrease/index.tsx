import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {SCREEN_WIDTH} from '../../constants/style/sizes';
import {CustomText} from '../customText';
import {ChangeAmountEnum} from '../ProductCard';
interface Props {
  amount: number;
  onItemPressed: () => void;

  onChangeAmount: (type: ChangeAmountEnum) => void;
  itemKey: number;
  initialAmount?: number;
}

const IncreaseAndDecreaseAmount = ({
  amount,
  onChangeAmount,
  initialAmount = 1,
  itemKey,
}: Props) => {
  return (
    <View style={styles.container}>
      <IconButton
        icon="minus"
        size={25}
        color={COLORS.MAINCOLOR}
        style={styles.counterSignIcon}
        onPress={() => onChangeAmount(ChangeAmountEnum.DECREASE)}
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomText text={`${amount}`} textStyle={{color: COLORS.MAINCOLOR}} />
      </View>

      <IconButton
        icon="plus-thick"
        size={25}
        color={COLORS.MAINCOLOR}
        style={styles.counterSignIcon}
        onPress={() => onChangeAmount(ChangeAmountEnum.INCREASE)}
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
    width: SCREEN_WIDTH / 3.5,
  },
  counterSignIcon: {
    borderWidth: 1,
    borderColor: COLORS.MAINCOLOR,
  },
});
