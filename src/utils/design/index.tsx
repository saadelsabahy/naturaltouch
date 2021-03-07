import React from 'react';
import {ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/style';

export const LoginArrow = (props: object) =>
  props.isLoading ? (
    <ActivityIndicator color={COLORS.WHITE} size="large" />
  ) : (
    <Icon
      style={{}}
      name="ios-arrow-forward"
      {...props}
      size={40}
      color={COLORS.WHITE}
    />
  );
