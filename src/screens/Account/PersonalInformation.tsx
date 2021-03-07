import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {CustomInput} from '../../components';
import {ROUNDED_BORDER, SCREEN_WIDTH} from '../../constants/style/sizes';
import COMMON_STYLES from '../../constants/style/CommonStyles';
import {useForm, Controller} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import validation from '../../utils/validation';
import {useMutation} from 'react-query';
import {endpoints} from '../../constants/apiEndpoints.constants';
import useAxios from '../../hooks/useAxios';
import {AuthenticationContext, SnackBarContext} from '../../contexts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';

interface Props {}

const PersonalInformation = (props: Props) => {
  const {t} = useTranslation();
  const Axios = useAxios();
  const navigation = useNavigation();
  const {showSnackbar} = useContext(SnackBarContext);
  const {
    state: {email, userName},
  } = useContext(AuthenticationContext);
  const defaultValues = {
    email: email,
    personalInfoPass: '',
    firstName: userName,
    lastName: userName,
  };
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
  const {isLoading, mutate, data, isError} = useMutation(
    (userData) => Axios.post(endpoints.editCustomer, userData),
    {
      onSuccess: (data) => onApplyChangesSuccess(data),
    },
  );
  const onApplyChangesSuccess = ({customer: {customer_id}}) => {
    if (customer_id) {
      reset();
    } else {
      showSnackbar(t('messages:checkInfoAndRetry'), true);
    }
  };
  const onApplyChanges = ({email, personalInfoPass, firstName, lastName}) => {
    mutate({
      email,
      password: personalInfoPass,
      firstname: firstName,
      lastname: lastName,
    });
  };
  return (
    <View style={[styles.container]}>
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <CustomInput
            fieldName={t('inputs:firstName')}
            returnKeyType={'next'}
            error={errors.firstName}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            value={value}
            label={t('inputs:firstName')}
          />
        )}
        name="firstName"
        rules={validation(t)['name']}
      />
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <CustomInput
            fieldName={t('inputs:lastName')}
            returnKeyType={'next'}
            error={errors.lastName}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            value={value}
            label={t('inputs:lastName')}
          />
        )}
        name="lastName"
        rules={validation(t)['name']}
      />
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <CustomInput
            fieldName={t('inputs:email')}
            returnKeyType={'next'}
            error={errors.email}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            value={value}
            label={t('inputs:email')}
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
            returnKeyType={'next'}
            error={errors.personalInfoPass}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            value={value}
            secureTextEntry
            label={t('inputs:password')}
          />
        )}
        name="personalInfoPass"
        rules={validation(t)['password']}
      />
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={[COMMON_STYLES.whiteText]}
        onPress={handleSubmit(onApplyChanges)}
        loading={isLoading}>
        {t('general:applyChanges')}
      </Button>
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={[COMMON_STYLES.whiteText]}
        onPress={() => navigation.navigate('ChangePassword')}
        loading={isLoading}>
        {t('general:editPassword')}
      </Button>
    </View>
  );
};

export default PersonalInformation;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    width: SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
    marginVertical: 10,
  },
  button: {borderRadius: ROUNDED_BORDER, marginVertical: 10},
});
