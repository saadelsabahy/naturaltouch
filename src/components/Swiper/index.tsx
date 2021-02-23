import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  I18nManager,
  Pressable,
  Platform,
} from 'react-native';
import Swiper from 'react-native-swiper';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import FastImage from 'react-native-fast-image';
import {COLORS} from '../../constants/style';
import {
  ROUNDED_BORDER,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SWIPER_HEIGHT,
} from '../../constants/style/sizes';
const {width} = Dimensions.get('window');
interface swiperImage {
  imagelinkType?: string;
  imagelinkId?: string;
  slideimage: string;
}

interface props {
  height?: string;
  showButtons?: boolean;
  onImagePressed?: (image: swiperImage) => void;
  images: swiperImage[];
  product?: boolean;
}
const CustomSwiper = ({
  height,
  showButtons,
  onImagePressed,
  images = [],
  product,
  ...props
}: props) => {
  return (
    <Swiper
      style={styles.wrapper}
      height={height || SWIPER_HEIGHT}
      autoplay
      loop
      removeClippedSubviews={false}
      showsPagination={!showButtons}
      dot={<View style={[styles.dot]} />}
      activeDot={<View style={[styles.activeDot]} />}
      //loadMinimal={true}
      automaticallyAdjustContentInsets={true}
      showsButtons={showButtons}
      paginationStyle={[styles.paginationStyle, {width: 20 * images.length}]}
      buttonWrapperStyle={{
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      }}
      prevButton={
        <Icon
          name={!I18nManager.isRTL ? 'arrow-left' : 'arrow-right'}
          size={50}
          color={COLORS.WHITE}
          style={{opacity: 0.8, start: -10}}
        />
      }
      nextButton={
        <Icon
          name={!I18nManager.isRTL ? 'arrow-right' : 'arrow-left'}
          size={50}
          color={COLORS.WHITE}
          iconContainerStyle={styles.buttonsContainer}
          style={{opacity: 0.8, end: -10}}
        />
      }
      {...props}>
      {images.map((image, index) => {
        return (
          <Pressable
            onPress={() => onImagePressed(image)}
            style={styles.slide}
            key={image.imagelinkId || `${image}${index}`}>
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              style={styles.image}
              source={{
                uri: image.slideimage,
              }}
            />
          </Pressable>
        );
      })}
    </Swiper>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    maxHeight: SWIPER_HEIGHT,
    alignItems: 'center',
  },

  slide: {
    width: '100%',
    height: '100%',
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  image: {
    width: '100%',
    flex: 1,
    backgroundColor: COLORS.MAINCOLOR,
  },
  paginationStyle: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    backgroundColor: 'rgba(0,0,0,.5)',
    borderRadius: ROUNDED_BORDER,
    bottom: 5,
    marginStart: (SCREEN_WIDTH * 0.98) / 2.8,
  },
  activeDot: {
    backgroundColor: COLORS.WHITE,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
  },
  buttonsContainer: {
    backgroundColor: '#785',
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
  },
});

export {CustomSwiper};
