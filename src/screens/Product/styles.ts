import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
const CIRCULAR_RADIUS = Math.round(SCREEN_WIDTH / 2 + SCREEN_HEIGHT / 2);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  swiperContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 2.5,
    overflow: 'hidden',
  },
  topIconsContainer: {
    width: SCREEN_WIDTH,
    position: 'absolute',
    top: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  productDetailesContainer: {
    width: '96%',
    alignSelf: 'center',
  },
  productName: {
    fontSize: 15,
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  brand: {
    color: COLORS.MAINCOLOR,
    fontSize: 17,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //alignItems: 'center',
    width: '100%',
    marginVertical: 5,
  },
  accordion: {
    //flex: 1,
    width: SCREEN_WIDTH / 2 - 10,
    backgroundColor: COLORS.GRAY_LIGHT,
    height: SCREEN_HEIGHT / 14,
    padding: 0,
    textTransform: 'capitalize',
  },
  columnAccordion: {
    height: SCREEN_HEIGHT / 15,
    padding: 0,
    backgroundColor: COLORS.WHITE,
  },
  productFeaturesListItem: {
    backgroundColor: COLORS.GRAY_LIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productInformationAccordionStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH * 0.85,
    alignItems: 'center',
  },
  buttonContainer: {
    width: SCREEN_WIDTH - 10,
    alignSelf: 'flex-end',
    borderTopStartRadius: CIRCULAR_RADIUS,
    borderBottomStartRadius: CIRCULAR_RADIUS,
    justifyContent: 'space-evenly',
    paddingEnd: 5,
    elevation: 2,
  },
  button: {
    borderTopStartRadius: CIRCULAR_RADIUS,
    borderBottomStartRadius: CIRCULAR_RADIUS,
    borderRadius: CIRCULAR_RADIUS,
    /* 
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, */
  },
  buttonTitleStyle: {
    // marginTop: 0,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5 / 2,
    backgroundColor: COLORS.MAINCOLOR,
    alignSelf: 'center',
  },
  attributeContainer: {
    alignItems: 'flex-start',
    marginVertical: 5,
    padding: 5,
  },
});

export default styles;
