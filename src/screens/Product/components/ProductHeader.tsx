import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {View, Text, StyleSheet, I18nManager} from 'react-native';
import {IconButton} from 'react-native-paper';
import {COLORS} from '../../../constants/style';
import {SCREEN_WIDTH} from '../../../constants/style/sizes';
import {AuthenticationContext, FavouritesContext} from '../../../contexts';

interface Props {
  onSharePressed: () => void;
  id: string;
}

const ProductHeader = ({onSharePressed, id}: Props) => {
  const navigation = useNavigation();
  const {favourites, addToFavourites, removeFromFavourites} = useContext(
    FavouritesContext,
  );
  const {
    state: {userToken},
  } = useContext(AuthenticationContext);
  const favouritesProductsIds = [
    ...new Set(favourites?.map((item) => item.product_id)),
  ];
  const liked = favouritesProductsIds.includes(id);

  const goBack = () => navigation.goBack();

  const onAddToFavouritePressed = () => {
    if (!!userToken) {
      liked ? removeFromFavourites(id) : addToFavourites(id);
    } else {
      navigation.navigate('Auth', {screen: 'Login'});
    }
  };
  return (
    <View style={[styles.topIconsContainer]}>
      <IconButton
        icon={I18nManager.isRTL ? 'chevron-right' : 'chevron-left'}
        size={30}
        color={COLORS.WHITE}
        style={styles.iconButton}
        onPress={goBack}
      />
      <View>
        <IconButton
          style={{backgroundColor: COLORS.GRAY_LIGHT}}
          icon={'heart'}
          size={30}
          color={liked ? COLORS.MAINCOLOR : COLORS.WHITE}
          onPress={onAddToFavouritePressed}
        />
        <IconButton
          icon={'share'}
          size={30}
          color={COLORS.WHITE}
          onPress={onSharePressed}
          style={{backgroundColor: COLORS.GRAY_LIGHT}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topIconsContainer: {
    width: SCREEN_WIDTH,
    position: 'absolute',
    top: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    marginStart: 4,
    paddingHorizontal: 0,
    paddingStart: 0,
    marginHorizontal: 0,
    backgroundColor: COLORS.GRAY_LIGHT,
  },
});

export {ProductHeader};
