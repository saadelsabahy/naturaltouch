import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT} from '../../constants/style/sizes';
import {AuthenticationContext} from '../../contexts';

interface Props {
  containerStyle?: ViewStyle;
}

const AccountInfo = ({containerStyle}: Props) => {
  const {
    state: {userName, userToken, email},
  } = useContext(AuthenticationContext);
  const {t} = useTranslation();
  return (
    <View style={[styles.headerContainer, containerStyle]}>
      {!!userToken && userName && (
        <View style={styles.logedInUserInfoContainer}>
          <Avatar.Image
            source={require('../../assets/images/user.png')}
            size={50}
            style={{backgroundColor: COLORS.WHITE}}
          />
          {!!userName && (
            <View style={styles.userNameContainer}>
              <Text style={styles.userName}>{`${t(
                'moreScreen:welcome',
              )} ${userName} !`}</Text>
              <Text style={styles.email}>{email}</Text>
              <Text style={styles.userName}>{userName}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export {AccountInfo};

const styles = StyleSheet.create({
  headerContainer: {
    height: SCREEN_HEIGHT / 13,
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  logedInUserInfoContainer: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    //top: -40,
    //backgroundColor: '#ddd',
    height: '100%',
  },
  userNameContainer: {
    marginStart: 10,
    height: '95%',
    justifyContent: 'center',
  },
  userName: {
    textTransform: 'uppercase',
    fontSize: 17,
    color: COLORS.WHITE,
  },
  email: {
    fontSize: 14,
    color: COLORS.WHITE,
  },
});
