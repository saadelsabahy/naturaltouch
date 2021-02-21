import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';

interface Props {
  height?: string;
}

const HeaderImage = ({height}: Props) => {
  return (
    <View
      style={[styles.headerImageContainer, {height: height ? height : '50%'}]}>
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        source={{
          uri:
            'https://www.noonmar.com/ecdata/stores/FTZXHS2928/image/data/LOGO.png',
        }}
        style={styles.headerImage}
      />
    </View>
  );
};

export {HeaderImage};

const styles = StyleSheet.create({
  headerImageContainer: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '90%',
    height: '100%',
  },
});
