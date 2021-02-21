import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, TextInput} from 'react-native-paper';
import {
  CustomInput,
  CustomText,
  HeaderImage,
  RegisterHeaderWithSocial,
} from '../../components';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import COMMON_STYLES from '../../constants/style/CommonStyles';
import {useForm, Controller} from 'react-hook-form';
import validation from '../../utils/validation';
import {useTranslation} from 'react-i18next';
import useAxios from '../../hooks/useAxios';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {useMutation} from 'react-query';
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthenticationContext, SnackBarContext} from '../../contexts';
import {USER_NAME} from '../../contexts/AuthContext/types';
interface Props {}
const defaultValues = {
  email: '',
  password: '',
  phone: '',
  firstname: '',
  lastname: '',
};

const Register = ({navigation}: Props) => {
  const [secureInput, setsecureInput] = React.useState(true);
  const passwordInputRef = React.useRef();
  const {t} = useTranslation();
  const Axios = useAxios();
  const {authContext} = useContext(AuthenticationContext);
  const {showSnackbar} = useContext(SnackBarContext);
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
  //toggleSecureInput
  const toggleSecureInput = () => {
    passwordInputRef?.current?.focus();
    setsecureInput(!secureInput);
  };
  const onSignInPressed = () => {
    navigation.goBack();
  };

  /* sign up */
  const onSignUpSuccess = async (data) => {
    const {
      customer: {firstname, lastname, password, customer_id},
      is_logged,
    } = data?.data;
    if (customer_id) {
      reset();
      authContext.signUp({
        userName: `${firstname} ${lastname}`,
        token: password,
      });
      await AsyncStorage.setItem(USER_NAME, `${firstname} ${lastname}`);

      navigation.navigate('Account');
    } else {
      showSnackbar(t('messages:checkInfoAndRetry'), true);
    }
  };
  const {isLoading, mutate, data, isError} = useMutation(
    (userData) => Axios.post(endpoints.registerCustomer, userData),
    {onSuccess: (data) => onSignUpSuccess(data)},
  );

  const onSignUp = async (data) => {
    // Reactotron.log(data);

    try {
      mutate(data);
    } catch (error) {
      console.log('register error');
    }
  };

  return (
    <View style={[styles.container]}>
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        /* extraHeight={0}
        extraScrollHeight={0} */
        resetScrollToCoords={{x: 0, y: 0}}>
        <View style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.3}}>
          <HeaderImage />
          <RegisterHeaderWithSocial />
        </View>
        <View style={[styles.formContainer]}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <CustomInput
                fieldName={t('inputs:firstName')}
                //onSubmitEditing={onEmailSubmitEditing}
                returnKeyType={'next'}
                error={errors.firstname}
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
                placeholder={t('inputs:placeholder', {
                  fieldName: t('inputs:firstName'),
                })}
              />
            )}
            name="firstname"
            rules={validation(t)['name']}
          />
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <CustomInput
                fieldName={t('inputs:lastName')}
                //onSubmitEditing={onEmailSubmitEditing}
                returnKeyType={'next'}
                error={errors.lastname}
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
                placeholder={t('inputs:placeholder', {
                  fieldName: t('inputs:lastName'),
                })}
              />
            )}
            name="lastname"
            rules={validation(t)['name']}
          />
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <CustomInput
                fieldName={t('inputs:telephone')}
                //onSubmitEditing={onEmailSubmitEditing}
                returnKeyType={'next'}
                error={errors.phone}
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
                keyboardType="numeric"
                placeholder={t('inputs:placeholder', {
                  fieldName: t('inputs:telephone'),
                })}
              />
            )}
            name="phone"
            rules={validation(t)['phone']}
          />

          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <CustomInput
                fieldName={t('inputs:email')}
                // onSubmitEditing={onEmailSubmitEditing}
                returnKeyType={'next'}
                error={errors.email}
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
                placeholder={t('inputs:placeholder', {
                  fieldName: t('inputs:email'),
                })}
              />
            )}
            name="email"
            rules={validation(t)['email']}
          />
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <CustomInput
                fieldName={t('inputs:password')}
                reference={passwordInputRef}
                error={errors.password}
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
                placeholder={t('inputs:placeholder', {
                  fieldName: t('inputs:password'),
                })}
                right={
                  <TextInput.Icon
                    onPress={toggleSecureInput}
                    size={20}
                    color={COLORS.GRAY}
                    name={secureInput ? 'eye-outline' : 'eye-off-outline'}
                  />
                }
                secureTextEntry={secureInput}
              />
            )}
            name="password"
            rules={validation(t)['password']}
          />
          <Button
            mode="contained"
            style={[COMMON_STYLES.deleteBorderRadius]}
            labelStyle={[COMMON_STYLES.whiteText]}
            onPress={handleSubmit(onSignUp)}
            loading={isLoading}>
            {t('auth:signUp')}
          </Button>
          <View style={[styles.secondaryButtonsContainer]}>
            <CustomText text={t('auth:alreadyHaveAccount')} />
            <CustomText
              text={t('auth:signIn')}
              onPress={onSignInPressed}
              textStyle={styles.signInText}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export {Register};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  formContainer: {
    // height: SCREEN_HEIGHT * 0.66,
    flex: 1,
    flexGrow: 1,
    width: SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    //backgroundColor: '#479',
  },
  secondaryButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    //marginVertical: 5,
  },
  signInText: {
    // fontWeight: 'bold',
    fontSize: 17,
    marginStart: 4,
  },
});
