import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text} from 'react-native-paper';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';

interface Props {
  height?: string;
}

const HeaderImage = ({height}: Props) => {
  const {t} = useTranslation();
  return (
    <View
      style={[styles.headerImageContainer, {height: height ? height : '50%'}]}>
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        source={{
          uri:
            'https://global.naturaltouchshop.com/ecdata/stores/RZATPJ3934/image/data/Logonew123.png',
        }}
        style={styles.headerImage}
      />
      <Text style={styles.greetingText}>{''}</Text>
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
  greetingText: {
    fontSize: 20,
    fontWeight: '700',
  },
});
