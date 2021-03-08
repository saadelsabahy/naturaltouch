import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';

interface Props {
  title: string;
  description: string;
}

const NotificationsItem = ({title, description}: Props) => {
  return (
    <Pressable
      style={({pressed}) => [styles.container, {opacity: pressed ? 0.8 : 1}]}>
      <View style={[styles.imageContainer]}>
        <FastImage
          source={require('../../assets/images/logo.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </Pressable>
  );
};

export {NotificationsItem};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 10,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 0.7,
    borderColor: COLORS.GRAY_LIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    width: '25%',
    height: '100%',
    marginEnd: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  text: {
    color: COLORS.MAINCOLOR,
    fontSize: 16,
    textTransform: 'capitalize',
  },
});
