import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomHeader} from '../../components';
import {COLORS} from '../../constants/style';
import EditPassword from './EditPassword';
interface Props {}

const ChangePassword = (props: Props) => {
  const {t} = useTranslation();
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow: 1}}
      stickyHeaderIndices={[0]}>
      <CustomHeader title={t('inputs:password')} />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <EditPassword />
      </View>
    </KeyboardAwareScrollView>
  );
};

export {ChangePassword};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});
