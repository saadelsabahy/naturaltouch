import React, {useContext} from 'react';
import {StyleSheet, View, I18nManager, Pressable} from 'react-native';
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
import {useMutation} from 'react-query';
import {endpoints} from '../../constants/apiEndpoints.constants';
import useAxios from '../../hooks/useAxios';
import {AuthenticationContext, SnackBarContext} from '../../contexts';
import {LoginArrow} from '../../utils/design';
interface Props {}
const defaultValues = {
  email: '',
  password: '',
};
const Login = ({navigation}: Props) => {
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
  const onEmailSubmitEditing = () => {
    passwordInputRef?.current?.focus();
  };
  const onSignUpPressed = () => {
    navigation.navigate('Register');
  };
  const onForgetPasswordPressed = () => {
    navigation.navigate('ForgetPassword');
  };
  const onSignIn = (data) => {
    // Reactotron.log(data);

    try {
      mutate(data);
    } catch (error) {
      console.log('register error');
    }
  };

  const onSignInSuccess = async (data) => {
    const {
      customer: {firstname, lastname, password, customer_id, email},
      is_logged,
    } = data?.data;
    if (customer_id) {
      await authContext.signIn({
        userData: {name: `${firstname} ${lastname}`, email},
        userToken: password,
      });
      reset();
      navigation.navigate('More');
    } else {
      showSnackbar(t('messages:checkInfoAndRetry'), true);
    }
  };
  const {isLoading, mutate, data, isError} = useMutation(
    (userData) => Axios.post(endpoints.loginCustomer, userData),
    {
      onSuccess: (data) => onSignInSuccess(data),
    },
  );

  return (
    <View style={[styles.container]}>
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid
        keyboardShouldPersistTaps="always"
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        resetScrollToCoords={{x: 0, y: 0}}>
        <View style={styles.headerContainer}>
          <HeaderImage />
        </View>
        <View style={[styles.formContainer]}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <CustomInput
                onSubmitEditing={onEmailSubmitEditing}
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
          <View style={[styles.secondaryButtonsContainer]}>
            <View style={styles.forgetAndSignupContainer}>
              <CustomText
                text={t('auth:signUp')}
                textStyle={styles.signUpText}
                onPress={onSignUpPressed}
              />
              <CustomText
                text={t('auth:forgetPassword')}
                onPress={onForgetPasswordPressed}
              />
            </View>
            <Pressable
              style={({pressed}) => [
                COMMON_STYLES.authButtonWithArrow,
                {opacity: pressed ? 0.7 : 1},
              ]}
              onPress={handleSubmit(onSignIn)}>
              {() => LoginArrow({isLoading})}
            </Pressable>
            {/*  <Button
              mode="contained"
             
              loading={isLoading}
              icon={(props) => LoginArrow(props)}
              labelStyle={[COMMON_STYLES.whiteText]}
            /> */}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export {Login};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  headerContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    height: SCREEN_HEIGHT / 2,
    width: SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
  },
  secondaryButtonsContainer: {
    height: SCREEN_HEIGHT / 10,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  signUpText: {
    textDecorationLine: 'underline',
    color: COLORS.MAINCOLOR,
    textDecorationColor: COLORS.MAINCOLOR,
  },
  button: {
    width: SCREEN_WIDTH / 4,
    height: SCREEN_HEIGHT / 11,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgetAndSignupContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});
