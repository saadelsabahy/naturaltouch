import React, {useContext} from 'react';
import {
  I18nManager,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import FastImage from 'react-native-fast-image';
import {AuthenticationContext} from '../../contexts';
import {HomeSearch} from '../HomeSearch';
import {useNavigation} from '@react-navigation/native';
import {BackArrow} from '../../svgs';
interface Props {
  onAccountPressed?: () => void;
  onMenuPressed?: () => void;
  useMainColor?: boolean;
  home?: boolean;
}
const logo =
  'https://www.noonmar.com/ecdata/stores/FTZXHS2928/image/data/LOGO.png';
const HomeHeader = ({
  useMainColor,
  onAccountPressed,
  onMenuPressed,
  home,
}: Props) => {
  const {
    state: {
      settings: {LogoURL},
    },
  } = useContext(AuthenticationContext);
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();
  const goBack = () => navigation.goBack();
  const onSearchFocused = () => navigation.navigate('Search');
  return (
    <Appbar.Header theme={{colors: {primary: COLORS.WHITE}}}>
      {canGoBack && !home ? (
        <Pressable onPress={goBack}>
          <BackArrow
            fill={useMainColor ? COLORS.MAINCOLOR : COLORS.GRAY}
            style={{
              transform: [{rotate: I18nManager.isRTL ? '180deg' : '0deg'}],
            }}
          />
        </Pressable>
      ) : (
        <Appbar.Action
          icon="menu"
          color={COLORS.GRAY}
          onPress={onMenuPressed}
        />
      )}
      <View style={styles.searchContainer}>
        <HomeSearch onFocus={onSearchFocused} />
      </View>

      <Appbar.Action />
    </Appbar.Header>
  );
};

export {HomeHeader};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '90%',
    width: '20%',
  },
});
