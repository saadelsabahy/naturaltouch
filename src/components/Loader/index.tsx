import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../../constants/style';

interface Props {
  containerStyle?: ViewStyle;
  color?: string;
}

const Loader = ({containerStyle, color}: Props) => {
  return (
    <View style={[styles.cotainer, containerStyle]}>
      <ActivityIndicator
        color={color || COLORS.MAINCOLOR}
        size={'large'}
        animating
      />
    </View>
  );
};

export {Loader};

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
  },
});
