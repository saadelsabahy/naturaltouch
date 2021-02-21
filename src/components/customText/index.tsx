import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  I18nManager,
  TextStyle,
  TextProps,
} from 'react-native';
import {COLORS} from '../../constants/style';
interface props extends TextProps {
  text: string;
  textStyle?: TextStyle;
  props?: TextProps;
}
const CustomText = ({text, textStyle, ...props}: props) => {
  return (
    <Text
      style={[
        styles.text,
        textStyle,
        {
          fontWeight: I18nManager.isRTL ? '100' : textStyle?.fontWeight,
        },
      ]}
      {...props}>
      {text}
    </Text>
  );
};
const styles = StyleSheet.create({
  text: {
    textTransform: 'capitalize',
    //textAlign: I18nManager.isRTL ? 'right' : 'left',
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
    padding: 0,
    margin: 0,
    fontFamily: 'Cairo-Regular',
    color: COLORS.GRAY,
    // textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});

export {CustomText};
