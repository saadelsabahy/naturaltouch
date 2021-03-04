import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT} from '../../constants/style/sizes';

interface Props {}

const TopCard = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text></Text>
    </View>
  );
};

export default TopCard;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    height: '100%',
    borderRadius: 20,
    elevation: 1,
    backgroundColor: COLORS.WHITE,
    /*  position: 'absolute',
    top: -SCREEN_HEIGHT / 5 / 2, */
  },
});
