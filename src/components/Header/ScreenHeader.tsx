import React from 'react';
import {
  I18nManager,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {Appbar, IconButton} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import FastImage from 'react-native-fast-image';
import {BackArrow} from '../../svgs';
import {useNavigation} from '@react-navigation/native';
interface Props {
  onBackPressed?: () => void;
  onSearchPressed?: () => void;
  title?: string;
  search?: boolean;
  useMainColor?: boolean;
}

const ScreenHeader: React.FC<Props> = ({
  onBackPressed,
  onSearchPressed,
  title,
  search,
  useMainColor,
  ...props
}) => {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  const goToSearch = () => navigation.navigate('Search');
  return (
    <Appbar.Header theme={{colors: {primary: COLORS.WHITE}}} {...props}>
      <Pressable onPress={goBack}>
        <BackArrow
          fill={useMainColor ? COLORS.MAINCOLOR : COLORS.GRAY}
          style={{transform: [{rotate: I18nManager.isRTL ? '180deg' : '0deg'}]}}
        />
      </Pressable>
      <Appbar.Content
        title={title}
        style={{alignItems: 'center'}}
        titleStyle={[
          styles.title,
          {color: useMainColor ? COLORS.MAINCOLOR : COLORS.GRAY},
        ]}
      />
      {search ? (
        <Appbar.Action
          icon="magnify"
          onPress={goToSearch}
          color={useMainColor ? COLORS.MAINCOLOR : COLORS.GRAY}
        />
      ) : (
        <Appbar.Action />
      )}
    </Appbar.Header>
  );
};

export {ScreenHeader};

const styles = StyleSheet.create({
  title: {
    color: COLORS.GRAY,
  },
});
