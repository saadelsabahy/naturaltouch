import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {CustomText} from '../customText';
import {COLORS} from '../../constants/style';
import {SCREEN_WIDTH} from '../../constants/style/sizes';

interface Props {
  iconSize?: number;
  emptyText: string;
}
const EmptyList = ({iconSize, emptyText}: Props) => {
  return (
    <View style={styles.container}>
      <Icon
        name={'exclamation'}
        size={iconSize || 40}
        color={COLORS.MAINCOLOR}
      />
      <CustomText text={emptyText} textStyle={styles.text} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.WHITE,
    width: SCREEN_WIDTH,
  },
  text: {
    letterSpacing: 1,
    marginVertical: 5,
  },
});

export {EmptyList};
