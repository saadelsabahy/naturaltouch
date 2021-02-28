import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInputProps as InputProps,
  TextInput as NativeTextInput,
  ViewStyle,
} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';
import {TextInputProps} from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT} from '../../constants/style/sizes';
import {CustomText} from '../customText';

interface Props extends TextInputProps {
  fieldName?: string;
  error: any;
  reference?: any;
  inputStyle?: ViewStyle;
}

const CustomInput = ({
  fieldName,
  error,
  reference,
  inputStyle,
  ...props
}: Props) => {
  return (
    <View style={[styles.container]}>
      {/*  {fieldName && (
        <CustomText text={fieldName} textStyle={styles.fieldName} />
      )} */}
      <TextInput
        mode="flat"
        style={[styles.input, inputStyle]}
        theme={{roundness: 7}}
        underlineColor={COLORS.GRAY}
        underlineHeight={0.5}
        ref={reference}
        render={(innerProps) => (
          <NativeTextInput
            {...innerProps}
            style={[
              innerProps.style,
              props.multiline
                ? {
                    paddingTop: 8,
                    paddingBottom: 8,
                    height: 100,
                  }
                : null,
            ]}
          />
        )}
        {...props}
        placeholder={props.placeholder?.toLocaleUpperCase()}
      />
      {error && error.message && (
        <HelperText type="error" visible={true} style={[styles.helperText]}>
          {error.message}
        </HelperText>
      )}
    </View>
  );
};

export {CustomInput};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  fieldName: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  input: {
    height: SCREEN_HEIGHT / 12,
    textTransform: 'uppercase',
    paddingHorizontal: 5,
    // borderRadius: 10,
  },
  helperText: {
    marginStart: 0,
    paddingStart: 0,
    fontSize: 14,
    marginTop: 0,
    marginBottom: 0,
    textTransform: 'capitalize',
  },
});
