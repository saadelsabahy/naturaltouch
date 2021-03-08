import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {
  CustomHeader,
  FlatlistWithCustomScrollIndicator,
  NotificationsItem,
} from '../../components';

interface Props {}

const Notifications = (props: Props) => {
  const {t} = useTranslation();
  return (
    <View style={[styles.container]}>
      <CustomHeader title={t('moreScreen:notifications')} />
      <FlatlistWithCustomScrollIndicator
        data={Array.from({length: 10}, (v, i) => i)}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => {
          return <NotificationsItem />;
        }}
      />
    </View>
  );
};

export {Notifications};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
