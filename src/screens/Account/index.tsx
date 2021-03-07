import React from 'react';
import {I18nManager, StyleSheet, Text, View, Pressable} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Appbar, IconButton} from 'react-native-paper';
import {AccountInfo, CustomHeader} from '../../components';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT} from '../../constants/style/sizes';
import {BackArrow} from '../../svgs';
import PersonalInformation from './PersonalInformation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

interface Props {}

const Account = ({navigation}: Props) => {
  return (
    <KeyboardAwareScrollView
      extraHeight={0}
      extraScrollHeight={0}
      stickyHeaderIndices={[0]}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: COLORS.MAINCOLOR,
      }}>
      <View style={{backgroundColor: COLORS.MAINCOLOR}}>
        <Appbar.Action
          onPress={() => navigation.goBack()}
          icon={(props) => {
            return (
              <SimpleLineIcons
                name={I18nManager.isRTL ? 'arrow-right' : 'arrow-left'}
                {...props}
                color={COLORS.WHITE}
              />
            );
          }}
        />
      </View>

      <View
        style={{
          height: SCREEN_HEIGHT / 5,
          backgroundColor: COLORS.MAINCOLOR,
          width: '100%',
        }}>
        <AccountInfo
          containerStyle={{
            height: '100%',
          }}
        />
      </View>
      <View style={styles.InfoContainer}>
        <PersonalInformation />
      </View>
    </KeyboardAwareScrollView>
  );
};

export {Account};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  InfoContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.WHITE,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    justifyContent: 'center',
  },
});
