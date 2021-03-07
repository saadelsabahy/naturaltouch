import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CustomInput} from '../../components';
import {ROUNDED_BORDER, SCREEN_WIDTH} from '../../constants/style/sizes';
import COMMON_STYLES from '../../constants/style/CommonStyles';
import {Button} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useForm, Controller} from 'react-hook-form';
import validation from '../../utils/validation';
import {endpoints} from '../../constants/apiEndpoints.constants';
import useAxios from '../../hooks/useAxios';
import {useMutation} from 'react-query';
import {SnackBarContext} from '../../contexts';

interface Props {}
const defaultValues = {
  newPassword: '',
  confirmPassword: '',
};
const EditPassword = (props: Props) => {
  const {t} = useTranslation();
  const Axios = useAxios();
  const {showSnackbar} = useContext(SnackBarContext);
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

  const {isLoading, mutate, data, isError} = useMutation(
    (userData) => Axios.post(endpoints.editCustomer, userData),
    {
      onSuccess: (data) => onApplyChangesSuccess(data),
    },
  );
  const onApplyChangesSuccess = ({
    data: {
      customer: {customer_id},
    },
  }) => {
    if (customer_id) {
      reset();
    } else {
      showSnackbar(t('messages:checkInfoAndRetry'), true);
    }
  };
  const onApplyChanges = ({newPassword}) => {
    mutate({
      password: newPassword,
    });
  };
  return (
    <View style={[styles.container]}>
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
      <Button
        mode="contained"
        style={[{borderRadius: ROUNDED_BORDER, marginVertical: 10}]}
        labelStyle={[COMMON_STYLES.whiteText]}
        onPress={handleSubmit(onApplyChanges)}
        loading={isLoading}>
        {t('general:applyChanges')}
      </Button>
    </View>
  );
};

export default EditPassword;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
    marginVertical: 10,
  },
});
