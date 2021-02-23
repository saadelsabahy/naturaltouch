import {Dimensions} from 'react-native';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get(
  'window',
);
export const SWIPER_HEIGHT = SCREEN_HEIGHT / 3.5;
export const ROUNDED_BORDER = Math.round(SCREEN_WIDTH / 2 + SCREEN_HEIGHT / 2);
