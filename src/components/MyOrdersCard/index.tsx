import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT} from '../../constants/style/sizes';
import {CustomText} from '../customText';

enum ORDER_STATUS {
  DELIVERED,
  SHIPPED,
  CANCELLED,
  INPROGRESS,
}
interface Props {
  onMyordersCardPressed?: () => void;
  orderStatus?: ORDER_STATUS;
  name: string;
  image: string;
  status?: string;
  manufacturer: string;
  quantity: string;
  price: string;
  orderDate: string;
}

const MyordersCard = ({
  onMyordersCardPressed,
  orderStatus = ORDER_STATUS.SHIPPED,
  name,
  image,
  status,
  manufacturer,
  quantity,
  price,
  orderDate,
}: Props) => {
  return (
    <Pressable style={styles.container} onPress={onMyordersCardPressed}>
      <View style={[styles.imageContainer]}>
        <FastImage
          source={{
            uri: image,
          }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <View style={styles.orderDetailesContainer}>
        <CustomText
          text={name}
          textStyle={styles.productName}
          numberOfLines={1}
        />
        <CustomText text={price} numberOfLines={1} />
        {!!status && (
          <View style={styles.statusTextContainer}>
            <CustomText
              text={status}
              textStyle={{
                color:
                  orderStatus == ORDER_STATUS.CANCELLED
                    ? COLORS.MOCK_BG_RED
                    : orderStatus == ORDER_STATUS.DELIVERED
                    ? 'green'
                    : COLORS.MOCK_BG_YELLOW,
              }}
            />
          </View>
        )}
        <CustomText
          text={manufacturer}
          // textStyle={styles.productName}
          numberOfLines={1}
        />
        <CustomText
          text={quantity}
          // textStyle={styles.productName}
          numberOfLines={1}
        />
        <CustomText
          text={orderDate}
          // textStyle={styles.productName}
          numberOfLines={1}
        />
      </View>
    </Pressable>
  );
};

export {MyordersCard};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: SCREEN_HEIGHT / 4,
    backgroundColor: COLORS.WHITE,
    marginBottom: 5,
    // maxHeight: SCREEN_HEIGHT / 3,
  },
  imageContainer: {
    width: '40%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  orderDetailesContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 7,
    //paddingVertical: 5,
  },
  statusTextContainer: {
    width: '100%',
    padding: 3,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontFamily: 'Cairo-Bold',
  },
});
