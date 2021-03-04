import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {COLORS, COMMON_STYLES} from '../../constants/style';
import {ROUNDED_BORDER, SCREEN_WIDTH} from '../../constants/style/sizes';
import {formatNumbers} from '../../utils';
import {CustomText} from '../customText';
import {ChangeAmountEnum} from '../ProductCard';
interface Props {
  amount: number;
  onChangeAmount: (type: ChangeAmountEnum) => void;
  itemKey?: number;
  initialAmount?: number;
  quantity?: number;
  containerStyle?: ViewStyle;
  circular?: boolean;
}

const IncreaseAndDecreaseAmount = ({
  amount,
  onChangeAmount,
  initialAmount = 1,
  itemKey,
  quantity,
  containerStyle,
  circular = true,
}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <IconButton
        icon="minus"
        size={25}
        color={COLORS.MAINCOLOR}
        style={[
          styles.counterSignIcon,
          {
            borderWidth: circular ? 1 : 0,
            borderRadius: circular ? ROUNDED_BORDER : 0,
            margin: 0,
          },
        ]}
        onPress={() => onChangeAmount(ChangeAmountEnum.DECREASE)}
        disabled={amount == initialAmount}
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderStartWidth: circular ? 0 : 0.4,
          borderEndWidth: circular ? 0 : 0.4,
          borderColor: COLORS.MOCK_BG_GRAY,
        }}>
        <TextInput
          editable={false}
          value={`${formatNumbers(amount)}`}
          style={[COMMON_STYLES.counterInput]}
        />
        {/* <CustomText text={`${amount}`} textStyle={{color: COLORS.MAINCOLOR}} /> */}
      </View>

      <IconButton
        icon="plus-thick"
        size={25}
        color={COLORS.MAINCOLOR}
        style={[
          styles.counterSignIcon,
          {
            borderWidth: circular ? 1 : 0,
            borderRadius: circular ? ROUNDED_BORDER : 0,
            margin: 0,
          },
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
    marginHorizontal: 4,
  },
  counterSignIcon: {
    borderColor: COLORS.MAINCOLOR,
  },
});
