import React, {memo, useCallback, useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import {Rating} from '../Rating';
import {CustomInput} from '../CustomInput';
import {Button, IconButton} from 'react-native-paper';
import {COLORS, COMMON_STYLES} from '../../constants/style';
import {useMutation} from 'react-query';
import useAxios from '../../hooks/useAxios';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {AuthenticationContext} from '../../contexts';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import validation from '../../utils/validation';
import {CustomText} from '../customText';

const defaultValues = {
  reviewComment: '',
};
interface Props {
  modalVisible: boolean;
  rating: number;
  onStarRatingPress: (rating: number) => void;
  closeModal: () => void;
  id: string;
}

const AddReviewModal = ({
  modalVisible,
  rating,
  onStarRatingPress,
  closeModal,
  id,
}: Props) => {
  const navigation = useNavigation();
  const {handleSubmit, errors, reset, control} = useForm({
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues,
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const {
    state: {userToken, userName},
  } = useContext(AuthenticationContext);
  const {t} = useTranslation();
  const Axios = useAxios();
  const [showRatingError, setshowRatingError] = useState(false);
  const reviewProduct = useCallback(
    async (reviewComment) => {
      const {data} = await Axios.post(endpoints.reviewProduct, {
        product: id,
        rating,
        text: reviewComment,
        name: userName,
      });
      return data;
    },
    [rating],
  );
  console.log(userName);

  const {data, isLoading, isError, mutate} = useMutation(
    `addReview${id}`,
    reviewProduct,
    {
      onSuccess: () => {
        closeModal();
        reset();
      },
    },
  );
  const onReviewProduct = ({reviewComment}) => {
    if (rating) {
      setshowRatingError(false);
      !!userToken
        ? mutate(reviewComment)
        : navigation.navigate('Auth', {screen: 'Login'});
    } else {
      setshowRatingError(true);
    }
  };
  return (
    <Modal isVisible={modalVisible} style={styles.modal} avoidKeyboard>
      <View style={styles.modalContainer}>
        <View style={styles.ratingContainer}>
          <Rating
            rating={rating}
            maxStars={5}
            starSize={30}
            onStarRatingPress={onStarRatingPress}
          />
          {showRatingError && (
            <CustomText
              textStyle={{color: COLORS.MOCK_BG_RED}}
              text={t('validation:required', {
                fieldName: t('productScreen:review'),
              })}
            />
          )}
        </View>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <CustomInput
              error={errors.reviewComment}
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              value={value}
              placeholder={t('inputs:placeholder', {
                fieldName: t('inputs:reviewComment'),
              })}
              multiline
              inputStyle={{
                height: SCREEN_HEIGHT / 8,
              }}
            />
          )}
          name="reviewComment"
          rules={validation(t, true)['name']}
        />

        <Button
          mode="contained"
          style={COMMON_STYLES.deleteBorderRadius}
          labelStyle={{color: COLORS.WHITE}}
          onPress={handleSubmit(onReviewProduct)}
          loading={isLoading}>
          {t('productScreen:review')}
        </Button>
        <View
          style={{
            position: 'absolute',
            start: 5,
            top: 5,
          }}>
          <IconButton
            style={{backgroundColor: COLORS.MAINCOLOR}}
            color={COLORS.WHITE}
            icon={'close'}
            size={20}
            onPress={closeModal}
          />
        </View>
      </View>
    </Modal>
  );
};

memo(AddReviewModal);
export {AddReviewModal};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 2.5,
    backgroundColor: COLORS.WHITE,
    padding: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    justifyContent: 'center',
  },
  ratingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
});
