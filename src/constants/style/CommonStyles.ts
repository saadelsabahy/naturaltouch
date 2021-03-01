import {StyleSheet} from 'react-native';
import {COLORS} from '.';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from './sizes';
const styles = StyleSheet.create({
  deleteBorderRadius: {
    borderRadius: 0,
    backgroundColor: COLORS.MAINCOLOR,
  },
  whiteText: {
    color: COLORS.WHITE,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.GRAY_LIGHT,
  },
  paginationLoaderStyle: {
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterAccordionHeader: {
    /*    width: SCREEN_WIDTH / 3,
    height: SCREEN_HEIGHT / 15,
    paddingVertical: 0,
    backgroundColor: COLORS.WHITE, */
  },
  authButtonWithArrow: {
    width: SCREEN_WIDTH / 4,
    height: SCREEN_HEIGHT / 11,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
