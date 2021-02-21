import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
//import {Text} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {CustomText} from '../customText';

interface Props {
  text?: string;
}

const SaveSign = ({text}: Props) => {
  return text ? (
    <View style={[styles.container]}>
      <CustomText
        textStyle={styles.text}
        text={text}
        props={{numberOfLines: 2}}
      />
    </View>
  ) : (
    <View />
  );
};

export {SaveSign};

const styles = StyleSheet.create({
  container: {
    maxWidth: 45,
    maxHeight: 40,
    backgroundColor: COLORS.MAINCOLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  text: {
    color: COLORS.WHITE,
    lineHeight: 16,
    paddingTop: 5,
    paddingStart: 5,
  },
});
