import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button, Text} from 'react-native-paper';
import reactotron from 'reactotron-react-native';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import {AuthenticationContext} from '../../contexts';
import {FIRST_INSTALL} from '../../contexts/AuthContext/types';
import useAxios from '../../hooks/useAxios';
import {useLanguage} from '../../hooks/useLanguage';

interface Props {}

const ChooseLanguage = (props: Props) => {
  const Axios = useAxios();
  const {onChageLanguage} = useLanguage();
  const {
    state: {
      settings: {LogoURL},
    },
  } = useContext(AuthenticationContext);
  const {t, i18n} = useTranslation();
  /*  const onChageLanguage = useCallback(
    async (language: string) => {
      // const language_code = I18nManager.isRTL ? 'en' : 'ar';
      try {
        await Axios.post(endpoints.switchLanguage, {
          language_code: language,
        });
        await AsyncStorage.setItem(FIRST_INSTALL, language);
        await i18n.changeLanguage(language);
      } catch (e) {
        console.log('switch lang error', e);
      }
    },
    [i18n],
  ); */
  return (
    <View style={styles.container}>
      <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
        <FastImage
          source={{uri: LogoURL}}
          style={styles.storeImage}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text>{t('localization:chooseLang')}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          mode="contained"
          style={styles.languageButton}
          labelStyle={styles.languageButtonLabel}
          onPress={() => onChageLanguage('ar')}>
          العربيه
        </Button>
        <Button
          mode="contained"
          style={styles.languageButton}
          labelStyle={styles.languageButtonLabel}
          onPress={() => onChageLanguage('en')}>
          english
        </Button>
      </View>
    </View>
  );
};

export default ChooseLanguage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
  },
  buttonsContainer: {
    width: SCREEN_WIDTH * 0.95,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  languageButton: {
    width: SCREEN_WIDTH / 3,
  },
  languageButtonLabel: {
    color: COLORS.WHITE,
  },
  storeImage: {
    width: '50%',
    height: '50%',
  },
});
