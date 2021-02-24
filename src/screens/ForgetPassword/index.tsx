import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, IconButton, TextInput, Text} from 'react-native-paper';
import {
  CustomHeader,
  CustomInput,
  CustomText,
  HeaderImage,
  RegisterHeaderWithSocial,
} from '../../components';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import COMMON_STYLES from '../../constants/style/CommonStyles';
import {useTranslation} from 'react-i18next';
import {useForm, Controller} from 'react-hook-form';
import validation from '../../utils/validation';
import {useMutation} from 'react-query';
import {endpoints} from '../../constants/apiEndpoints.constants';
import Reactotron from 'reactotron-react-native';
import axios from 'axios';
import {AuthenticationContext} from '../../contexts';
import {API_V1, STORE_URL} from '../../constants/config.constants';
import FastImage from 'react-native-fast-image';
import {LoginArrow} from '../../utils/design';

interface Props {}
const defaultValues = {
  requestCodeEmail: '',
  securityCode: '',
  newPassword: '',
  confirmPassword: '',
};
const ForgetPassword = ({navigation}: Props) => {
  const {t} = useTranslation();
  const [requestCode, setRequestCode] = useState<boolean>(true);
  const [requestError, setrequestError] = useState<boolean>(false);
  const {
    state: {storeToken},
  } = useContext(AuthenticationContext);
  const {handleSubmit, errors, reset, control, watch} = useForm({
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues,
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const newPassword = React.useRef({});
  newPassword.current = watch('newPassword', '');
  const onSignInPressed = () => {
    navigation.goBack();
  };
  const onRequestCodePressed = (data) => {
    Reactotron.log(data);

    try {
      requestCodeMutation(data);
    } catch (error) {
      console.log('requestCode error');
    }
  };

  const onRequestCodeSuccess = async (data) => {
    setrequestError(false);
    if (requestCode) {
      const {status} = data?.data;
      Reactotron.log('requestCode', data);
      if (status == 'ok') {
        setRequestCode(false);
        reset();
      } else {
        setrequestError(true);
      }
    } else {
      const {status} = data?.data;
      Reactotron.log('reset pass', status);
      if (status == 'ok') {
        reset();
        navigation.navigate('Login');
      } else {
        setrequestError(true);
      }
    }
  };
  const {isLoading, mutate: requestCodeMutation, data, isError} = useMutation(
    (userData) =>
      requestCode
        ? axios.post(STORE_URL + API_V1 + endpoints.forgetpassword, {
            email: userData?.requestCodeEmail,
          })
        : axios.post(STORE_URL + API_V1 + endpoints.resetpassword, {
            security_code: userData?.securityCode,
            new_password: userData?.newPassword,
            confirm_password: userData?.confirmPassword,
          }),
    {onSuccess: (data) => onRequestCodeSuccess(data)},
  );

  return (
    <View style={[styles.container]}>
      <CustomHeader title={t('auth:forgetPassword')} />
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        extraHeight={0}
        extraScrollHeight={0}
        resetScrollToCoords={{x: 0, y: 0}}>
        <View
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT * 0.3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <IconButton icon="lock-reset" disabled />
          <Text numberOfLines={3} style={{alignSelf: 'center'}}>
            {t('auth:resetPasswordText')}
          </Text>
          {/* <RegisterHeaderWithSocial /> */}
        </View>
        <View style={[styles.formContainer]}>
          <Text style={{alignSelf: 'center', marginVertical: 15}}>
            {t('auth:forgetPassword')}
          </Text>
          {requestError && (
            <CustomText
              text={t('messages:checkInfoAndRetry')}
              textStyle={{color: 'red'}}
            />
          )}
          {requestCode && (
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <CustomInput
                  fieldName={t('inputs:email')}
                  // onSubmitEditing={onEmailSubmitEditing}
                  returnKeyType={'next'}
                  error={errors.requestCodeEmail}
                  onChangeText={(value) => onChange(value)}
                  onBlur={onBlur}
                  value={value}
                  placeholder={t('inputs:placeholder', {
                    fieldName: t('inputs:email'),
                  })}
                />
              )}
              name="requestCodeEmail"
              rules={validation(t)['email']}
            />
          )}
          {!requestCode && (
            <>
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <CustomInput
                    fieldName={t('inputs:securityCode')}
                    // onSubmitEditing={onEmailSubmitEditing}
                    returnKeyType={'next'}
                    error={errors.securityCode}
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    value={value}
                    placeholder={t('inputs:placeholder', {
                      fieldName: t('inputs:securityCode'),
                    })}
                  />
                )}
                name="securityCode"
                rules={validation(t)['name']}
              />
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <CustomInput
                    fieldName={t('inputs:newPassword')}
                    // onSubmitEditing={onEmailSubmitEditing}
                    returnKeyType={'next'}
                    error={errors.newPassword}
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    value={value}
                    placeholder={t('inputs:placeholder', {
                      fieldName: t('inputs:newPassword'),
                    })}
                    secureTextEntry
                  />
                )}
                name="newPassword"
                rules={validation(t)['password']}
              />
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <CustomInput
                    fieldName={t('inputs:confirmPassword')}
                    // onSubmitEditing={onEmailSubmitEditing}
                    returnKeyType={'next'}
                    error={errors.confirmPassword}
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    value={value}
                    // reference={newPassword}
                    placeholder={t('inputs:placeholder', {
                      fieldName: t('inputs:confirmPassword'),
                    })}
                    secureTextEntry
                  />
                )}
                rules={{
                  validate: (value) =>
                    value === newPassword.current ||
                    t('validation:confirmPassword', {
                      fieldName: t('inputs:newPassword'),
                    }),
                }}
                name="confirmPassword"
                // rules={validation(t)['password']}
              />
            </>
          )}
          <Button
            mode="contained"
            style={[
              COMMON_STYLES.authButtonWithArrow,
              {marginVertical: 10, alignSelf: 'flex-end'},
            ]}
            labelStyle={[COMMON_STYLES.whiteText]}
            onPress={handleSubmit(onRequestCodePressed)}
            loading={isLoading}
            icon={(props) => LoginArrow(props)}
          />

          <CustomText text={t('auth:signIn')} onPress={onSignInPressed} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export {ForgetPassword};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  formContainer: {
    flex: 1,
    width: SCREEN_WIDTH * 0.9,
    maxHeight: SCREEN_HEIGHT * 0.6,
    alignSelf: 'center',
    justifyContent: 'center',
    //backgroundColor: '#479',
  },
  secondaryButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
