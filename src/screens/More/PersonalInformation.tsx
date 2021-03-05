import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {CustomInput} from '../../components';
import {SCREEN_WIDTH} from '../../constants/style/sizes';
import COMMON_STYLES from '../../constants/style/CommonStyles';
import {useForm, Controller} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import validation from '../../utils/validation';
import {useMutation} from 'react-query';
import {endpoints} from '../../constants/apiEndpoints.constants';
import useAxios from '../../hooks/useAxios';
import {SnackBarContext} from '../../contexts';

interface Props {}
const defaultValues = {
  email: '',
  personalInfoPass: '',
  firstName: '',
  lastName: '',
};
const PersonalInformation = (props: Props) => {
  const {t} = useTranslation();
  const Axios = useAxios();
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
            placeholder={t('inputs:placeholder', {
              fieldName: t('inputs:firstName'),
            })}
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
            placeholder={t('inputs:placeholder', {
              fieldName: t('inputs:lastName'),
            })}
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
            returnKeyType={'next'}
            error={errors.personalInfoPass}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            value={value}
            secureTextEntry
            placeholder={t('inputs:placeholder', {
              fieldName: t('inputs:password'),
            })}
          />
        )}
        name="personalInfoPass"
        rules={validation(t)['password']}
      />
      <Button
        mode="contained"
        style={[COMMON_STYLES.deleteBorderRadius]}
        labelStyle={[COMMON_STYLES.whiteText]}
        onPress={handleSubmit(onApplyChanges)}
        loading={isLoading}>
        {t('general:apply')}
      </Button>
    </View>
  );
};

export default PersonalInformation;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
    marginVertical: 10,
  },
});
