import React from 'react';
import {I18nManager, StyleSheet, Text, View} from 'react-native';
import {CustomText} from '../customText';
import StarRating from 'react-native-star-rating';
import {COLORS} from '../../constants/style';
interface Props {
  maxStars?: number;
  disabled?: boolean;
  rating: number;
  starSize?: number;
  onStarRatingPress?: (rating: number) => void;
  showRateNumber?: boolean;
}

const Rating = ({
  maxStars,
  disabled,
  rating,
  starSize,
  onStarRatingPress,
  showRateNumber,
}: Props) => {
  const onRatingPress = (rating: number) => console.log(rating, typeof rating);

  return (
    <View style={[styles.container]}>
      {showRateNumber && (
        <CustomText text={`${rating}`} textStyle={styles.text} />
      )}
      <StarRating
        disabled={false}
        maxStars={Math.floor(maxStars ? maxStars : rating)}
        rating={rating}
        selectedStar={onStarRatingPress || onRatingPress}
        starSize={starSize || 12}
        fullStarColor={COLORS.RATING_GOLD}
        starStyle={[styles.star]}
        fullStar={'star'}
        emptyStar={'star'}
        emptyStarColor={COLORS.GRAY_LIGHT}
      />
    </View>
  );
};

export {Rating};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginEnd: 5,
  },
  text: {
    marginEnd: 5,
  },
});
