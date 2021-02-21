import React from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Button} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {SCREEN_WIDTH} from '../../constants/style/sizes';
import {CustomText} from '../customText';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {useTranslation} from 'react-i18next';
interface Props {
  onBayPressed: () => void;
  Totalprice: string;
  payLabel: string;
  showTotal?: boolean;
  containerStyle?: ViewStyle;
  buttonStyle: ViewStyle;
  buttonTitleStyle: TextStyle;
  actualPrice: string;
}

const CartFooter = ({
  onBayPressed,
  containerStyle,
  showTotal,
  Totalprice,
  payLabel,
  buttonStyle,
  buttonTitleStyle,
  actualPrice,
}: Props) => {
  const {t} = useTranslation();
  console.log(Totalprice, actualPrice);

  /*  const openLink = React.useCallback(async () => {
    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open('https://www.noonmar.com', {
          // preferredBarTintColor: mainColor,
          // toolbarColor: mainColor,
          // preferredControlTintColor: mainColor,
          // iOS Properties
          ephemeralWebSession: false,
          // Android Properties
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        });
      } else {
        await Linking.openURL('https://www.noonmar.com');
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
 */
  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.totalPriceContainer,
          {
            flexDirection: showTotal ? 'column' : 'row',
            alignItems: showTotal ? 'center' : 'flex-end',
          },
        ]}>
        {showTotal && (
          <CustomText text={t('cart:total')} textStyle={styles.priceTexxt} />
        )}
        {Totalprice && (
          <CustomText
            text={Totalprice}
            textStyle={{...styles.priceTexxt, fontSize: 20}}
          />
        )}
        {actualPrice && (
          <View style={[{alignItems: 'flex-end', height: '100%'}]}>
            <CustomText
              text={actualPrice}
              textStyle={{
                ...styles.priceTexxt,
                fontSize: 15,
                color: COLORS.GRAY_LIGHT,
                textDecorationLine: 'line-through',
              }}
            />
          </View>
        )}
      </View>

      <Button
        mode="contained"
        labelStyle={[styles.buttonLabel, buttonTitleStyle]}
        style={[styles.button, buttonStyle]}
        onPress={onBayPressed}>
        {payLabel || t('cart:payNow')}
      </Button>
    </View>
  );
};

export {CartFooter};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    backgroundColor: COLORS.WHITE,
  },
  totalPriceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceTexxt: {
    color: COLORS.MAINCOLOR,
    fontSize: 15,
    textTransform: 'uppercase',
  },
  button: {
    width: '60%',
    borderRadius: 0,
    borderTopStartRadius: 15,
    borderBottomStartRadius: 15,
    backgroundColor: COLORS.MAINCOLOR,
  },
  buttonLabel: {
    color: COLORS.WHITE,
  },
});
