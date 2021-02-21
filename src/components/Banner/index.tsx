import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT} from '../../constants/style/sizes';

interface Props {
  onImagePressed?: () => void;
  image: string;
}

const Banner = ({onImagePressed, image}: Props) => {
  return (
    <View style={[styles.container]}>
      <FastImage
        source={{
          uri: image,
        }}
        style={{width: '100%', height: '100%'}}
        resizeMode={FastImage.resizeMode.stretch}
      />
    </View>
  );
};

export {Banner};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: SCREEN_HEIGHT / 4,
    minHeight: SCREEN_HEIGHT / 5,
    backgroundColor: COLORS.WHITE,
    marginBottom: 1,
  },
});
