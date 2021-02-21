import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Avatar} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import {CustomText} from '../customText';
import {Rating} from '../Rating';

interface Props {
  userName: string;
  rating: number;
  comment: string;
}

const CustomerEvaluation = ({userName, rating, comment}: Props) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.userInfoContainer]}>
        <Avatar.Image
          size={24}
          style={{marginEnd: 4}}
          source={{
            uri:
              'https://thumbs.dreamstime.com/b/education-hero-header-image-mockup-tablet-pc-background-use-website-72186653.jpg',
          }}
        />
        <CustomText text={userName} textStyle={styles.userName} />
        <Rating maxStars={5} rating={rating} />
      </View>
      <View style={[styles.commentContainer]}>
        <CustomText text={comment} />
      </View>
      {/* <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            'https://thumbs.dreamstime.com/b/education-hero-header-image-mockup-tablet-pc-background-use-website-72186653.jpg',
            'https://thumbs.dreamstime.com/b/education-hero-header-image-mockup-tablet-pc-background-use-website-72186653.jpg',
            'https://thumbs.dreamstime.com/b/education-hero-header-image-mockup-tablet-pc-background-use-website-72186653.jpg',
            'https://thumbs.dreamstime.com/b/education-hero-header-image-mockup-tablet-pc-background-use-website-72186653.jpg',
            'https://thumbs.dreamstime.com/b/education-hero-header-image-mockup-tablet-pc-background-use-website-72186653.jpg',
            'https://thumbs.dreamstime.com/b/education-hero-header-image-mockup-tablet-pc-background-use-website-72186653.jpg',
          ]}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: SCREEN_WIDTH / 3,
                  height: SCREEN_HEIGHT / 7,
                  marginEnd: 5,
                }}>
                <FastImage
                  source={{uri: item}}
                  resizeMode={FastImage.resizeMode.cover}
                  style={{width: '100%', height: '100%'}}
                />
              </View>
            );
          }}
        />
      </View> */}
    </View>
  );
};

export {CustomerEvaluation};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
    //backgroundColor: 'red',
  },
  userInfoContainer: {
    flexDirection: 'row',
  },
  userName: {
    marginEnd: 4,
    color: COLORS.GRAY,
    fontWeight: 'bold',
    textTransform: 'lowercase',
    marginHorizontal: 4,
  },
  commentContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 5,
    alignItems: 'flex-start',
  },
});
