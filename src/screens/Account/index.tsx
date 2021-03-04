import React, {useContext} from 'react';
import {
  I18nManager,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {Avatar, Button, IconButton, List, Text} from 'react-native-paper';
import {CustomText, HeaderImage, Loader, MoreItem} from '../../components';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import ChangePassword from './ChangePassword';
import PersonalInformation from './PersonalInformation';
import {useTranslation} from 'react-i18next';
import {AuthenticationContext} from '../../contexts';
import {useQuery} from 'react-query';
import useAxios from '../../hooks/useAxios';
import {endpoints} from '../../constants/apiEndpoints.constants';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useLanguage} from '../../hooks/useLanguage';
import TopCard from './TopCard';
interface Props {}
const TOP_CART_HEIGHT = SCREEN_HEIGHT / 5;
const headerComponent = (userName: string, userToken: boolean) => (
  <View style={[styles.headerContainer]}>
    {userToken && userName && (
      <View style={styles.logedInUserInfoContainer}>
        <Avatar.Image
          source={{
            uri: '',
          }}
          size={50}
          style={{backgroundColor: COLORS.WHITE}}
        />
        {!!userName && (
          <View style={styles.userNameContainer}>
            <CustomText text={userName} textStyle={styles.userName} />
            <CustomText text={userName} textStyle={styles.email} />
            <CustomText text={userName} textStyle={styles.userName} />
          </View>
        )}
      </View>
    )}
  </View>
);
const Account = ({navigation}: Props) => {
  const {t} = useTranslation();
  const {
    state: {userName, userToken},
    authContext,
  } = useContext(AuthenticationContext);
  const Axios = useAxios();
  const {onChageLanguage} = useLanguage();
  const getContactUs = async () => {
    const {
      data: {Sections},
    } = await Axios.post(endpoints.contactUs);
    return Sections[0];
  };
  const {data, isLoading, isError} = useQuery('customerService', getContactUs);

  const onAccordionPressed = (name: string) => {
    console.log(name);

    if (name == t('accountScreen:favourite')) {
      navigation.navigate('Favourites');
    } else {
      navigation.navigate('PurchasesStack');
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.MAINCOLOR}}>
      <View
        style={[
          styles.header,
          {height: userToken ? SCREEN_HEIGHT / 4 : SCREEN_HEIGHT / 7},
        ]}>
        <IconButton
          onPress={() => navigation.navigate(userToken ? 'Cart' : 'Auth')}
          icon={(props) => (
            <Fontisto
              {...props}
              name={'shopping-basket'}
              color={COLORS.WHITE}
            />
          )}
        />
        {userToken && (
          <View style={{flex: 1, justifyContent: 'center'}}>
            {headerComponent(userName, !!userToken)}
          </View>
        )}
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.scrollViewContentContainer}>
        <View
          style={{
            height: TOP_CART_HEIGHT,
            width: '100%',
            position: 'absolute',
          }}>
          <TopCard />
        </View>
        <View style={styles.contentContainer}>
          {!!!userToken && (
            <MoreItem
              sections={[
                {
                  name: !!userToken
                    ? t('auth:signOut')
                    : `${t('auth:signIn')} / ${t('auth:signUp')}`,
                  icon: 'account-circle',
                  onPress: () =>
                    !!userToken
                      ? authContext.signOut()
                      : navigation.navigate('Auth'),
                },
              ]}
            />
          )}

          <MoreItem
            title={t('accountScreen:support')}
            sections={[
              {
                name: t('accountScreen:whatsapp'),
                icon: 'whatsapp',
                onPress: () =>
                  Linking.openURL(
                    `whatsapp://send?text=hello&phone=${data.firstcontacdetails}`,
                  ),
              },
              {
                name: t('accountScreen:contactUs'),
                icon: 'phone-in-talk-outline',
                onPress: () =>
                  Linking.openURL(`tel:${data.firstcontacdetails}`),
              },
              {
                name: t('accountScreen:commonQuestions'),
                icon: 'comment-question',
                onPress: () => console.log('login'),
              },
            ]}
          />

          <MoreItem
            title={t('accountScreen:settings')}
            sections={[
              {
                name: !I18nManager.isRTL ? 'العربيه' : 'english',
                icon: 'translate',
                onPress: () => onChageLanguage(I18nManager.isRTL ? 'en' : 'ar'),
              },
              {
                name: t('auth:signOut'),
                icon: 'logout-variant',
                onPress: () => authContext.signOut(),
              },
            ]}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export {Account};

const styles = StyleSheet.create({
  header: {
    height: SCREEN_HEIGHT / 7,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-between',
  },
  body: {
    flex: 1,
  },
  scrollViewContentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerContainer: {
    height: SCREEN_HEIGHT / 13,
    width: '90%',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    backgroundColor: COLORS.WHITE,
    marginTop: TOP_CART_HEIGHT / 2,
    paddingTop: TOP_CART_HEIGHT / 2,
  },
  logedInUserInfoContainer: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
