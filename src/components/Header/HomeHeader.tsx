import React, {useContext} from 'react';
import {
  I18nManager,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {Appbar, Badge} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import FastImage from 'react-native-fast-image';
import {AuthenticationContext, cartContext} from '../../contexts';
import {HomeSearch} from '../HomeSearch';
import {useNavigation} from '@react-navigation/native';
import {BackArrow} from '../../svgs';
import Icon from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import reactotron from 'reactotron-react-native';
interface Props {
  onAccountPressed?: () => void;
  onMenuPressed?: () => void;
  useMainColor?: boolean;
  home?: boolean;
}

const HomeHeader = ({
  useMainColor,
  onAccountPressed,
  onMenuPressed,
  home,
}: Props) => {
  const {
    state: {
      settings: {LogoURL},
      userToken,
    },
  } = useContext(AuthenticationContext);
  const {cartProducts} = useContext(cartContext);
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();
  const goBack = () => navigation.goBack();
  const onSearchFocused = () => navigation.navigate('Search');
  const goToCart = () => navigation.navigate(userToken ? 'Cart' : 'Auth');
  return (
    <Appbar.Header theme={{colors: {primary: COLORS.WHITE}}}>
      <Appbar.Action
        icon={(props) => {
          return canGoBack && !home ? (
            <Pressable onPress={goBack}>
              <SimpleLineIcons
                name={I18nManager.isRTL ? 'arrow-right' : 'arrow-left'}
                {...props}
                color={COLORS.MAINCOLOR}
              />
            </Pressable>
          ) : (
            <View style={styles.logoContainer}>
              <FastImage
                source={{uri: LogoURL || ''}}
                style={styles.image}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          );
        }}
      />
      <View style={styles.searchContainer}>
        <HomeSearch onFocus={onSearchFocused} />
      </View>

      <Appbar.Action
        icon={(props) => (
          <>
            {!!cartProducts?.products?.length && (
              <Badge
                visible={true}
                size={22}
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 2,
                  backgroundColor: COLORS.MAINCOLOR,
                  zIndex: 1000,
                  color: COLORS.WHITE,
                }}>
                {cartProducts.products.length}
              </Badge>
            )}
            <Icon
              name={'shopping-basket'}
              {...props}
              color={COLORS.GRAY_LIGHT}
            />
          </>
        )}
        onPress={goToCart}
      />
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
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.MAINCOLOR,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
