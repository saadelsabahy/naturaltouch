import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/style';

export const LoginArrow = (props: object) => (
  <Icon
    style={{start: 5}}
    name="ios-arrow-forward"
    {...props}
    size={40}
    color={COLORS.WHITE}
  />
);
