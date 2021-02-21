import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import {CustomText} from '../customText';

interface Props {}

const NoInternet = (props: Props) => {
  const {t} = useTranslation();
  return (
    <View style={[styles.container]}>
      <CustomText
        text={t('messages:noInternet')}
        textStyle={{color: COLORS.WHITE}}
      />
    </View>
  );
};

export {NoInternet};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.MOCK_BG_RED,
  },
});
