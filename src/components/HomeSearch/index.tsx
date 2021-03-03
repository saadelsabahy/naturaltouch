import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput as NativeTextInput,
} from 'react-native';
import {IconButton, TextInput} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT} from '../../constants/style/sizes';
import {ColorsBackground} from '../ColorsBackground';

interface Props {
  onFocus: () => void;
}

const HomeSearch = ({onFocus, ...props}: Props) => {
  const {t, i18n} = useTranslation();
  return (
    <View style={[styles.container]}>
      <Pressable style={styles.searchContainer} onPress={onFocus}>
        <TextInput
          mode="flat"
          disabled
          placeholder={t('homeScreen:searchPlaceHolder')}
          style={styles.input}
          left={
            <TextInput.Icon
              icon="magnify"
              onPress={onFocus}
              style={{marginBottom: 0}}
            />
          }
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
        />
      </Pressable>
    </View>
  );
};

export {HomeSearch};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 5,
    paddingBottom: 5,
    borderWidth: 1,
  },
  searchContainer: {
    width: '100%',
    height: SCREEN_HEIGHT / 20,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
  },
  input: {
    height: SCREEN_HEIGHT / 18,
    width: '100%',
    backgroundColor: COLORS.WHITE,
  },
});
