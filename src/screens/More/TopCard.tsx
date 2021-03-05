import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT} from '../../constants/style/sizes';

interface Props {}
interface IconWithTextProps {
  icon: string;
  text: string;
  onPress: () => void;
}
const IconWithText = ({icon, text, onPress}: IconWithTextProps) => (
  <View style={{flex: 1, alignItems: 'center'}}>
    <IconButton
      icon={icon}
      style={styles.icon}
      size={30}
      color={COLORS.WHITE}
      onPress={onPress}
    />
    <Text style={styles.text}>{text}</Text>
  </View>
);
const TopCard = (props: Props) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const onFavouritesPressed = () => {
    navigation.navigate('Favourites');
  };
  return (
    <View style={styles.container}>
      <IconWithText
        icon={'bell-outline'}
        text={t('moreScreen:notifications')}
      />
      <IconWithText
        icon={'heart-box-outline'}
        text={t('accountScreen:favourite')}
        onPress={onFavouritesPressed}
      />
      <IconWithText icon={'bell'} text={'notification'} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    /*  position: 'absolute',
    top: -SCREEN_HEIGHT / 5 / 2, */
  },
  icon: {
    backgroundColor: COLORS.MAINCOLOR,
  },
  text: {},
});
