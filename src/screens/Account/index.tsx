import React, {useContext} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {Avatar, Button, IconButton, List, Text} from 'react-native-paper';
import {CustomText, HeaderImage, Loader} from '../../components';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import ChangePassword from './ChangePassword';
import PersonalInformation from './PersonalInformation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';
import {AuthenticationContext} from '../../contexts';
import {useQuery} from 'react-query';
import useAxios from '../../hooks/useAxios';
import {endpoints} from '../../constants/apiEndpoints.constants';

interface Props {}

const headerComponent = (userName: string, userToken: boolean) => (
  <View style={[styles.headerContainer]}>
    <HeaderImage height={'70%'} />

    {userToken && userName && (
      <View style={styles.logedInUserInfoContainer}>
        <Avatar.Image
          source={{
            uri:
              'https://www.noonmar.com/ecdata/stores/FTZXHS2928/image/data/LOGO.png',
          }}
          size={80}
        />
        {!!userName && (
          <View style={styles.userNameContainer}>
            <CustomText text={userName} textStyle={styles.userName} />
            <CustomText
              text={'200 pt'}
              textStyle={{...styles.userName, textAlign: 'center'}}
            />
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
  const getContactUs = async () => {
    const {
      data: {Sections},
    } = await Axios.post(endpoints.contactUs);
    return Sections[0];
  };
  const {data, isLoading, isError} = useQuery('customerService', getContactUs);
  const MOCK_DATA = [
    {
      icon: 'account-edit-outline',
      name: t('accountScreen:personalInformation'),
    },
    {icon: 'lock-outline', name: t('accountScreen:changeMyPassword')},
    {icon: 'heart-outline', name: t('accountScreen:favourite')},
    {icon: 'cart-outline', name: t('accountScreen:myPurchases')},
    {icon: 'account-circle-outline', name: t('accountScreen:customerServices')},
  ];
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
      <View style={styles.header}>
        <IconButton icon="cart" />
      </View>
      <View style={styles.body}></View>
      {/* <List.AccordionGroup>
        <KeyboardAwareFlatList
          enableOnAndroid
          resetScrollToCoords={{x: 0, y: 0}}
          ListHeaderComponent={() => headerComponent(userName, !!userToken)}
          contentContainerStyle={{backgroundColor: COLORS.WHITE, flexGrow: 1}}
          data={MOCK_DATA}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item: {name, icon}, index}) => {
            {
              return !(
                name == t('accountScreen:favourite') ||
                name == t('accountScreen:myPurchases')
              ) ? (
                <List.Accordion
                  style={styles.accordionItem}
                  title={name}
                  id={`${index}`}
                  titleStyle={{
                    textTransform: 'capitalize',
                    alignSelf: 'center',
                  }}
                  onPress={() => onAccordionPressed(name)}
                  left={(props) => (
                    <List.Icon
                      style={{marginHorizontal: 0}}
                      {...props}
                      icon={icon}
                    />
                  )}>
                  {name == t('accountScreen:personalInformation') && (
                    <PersonalInformation />
                  )}
                  {name == t('accountScreen:changeMyPassword') && (
                    <ChangePassword />
                  )}
                  {name == t('accountScreen:customerServices') && (
                    <>
                      <View style={styles.customerServiceInfoContainer}>
                        {data && (
                          <>
                            <View style={styles.contactTextContainer}>
                              <CustomText
                                text={`${t('accountScreen:hotLine')} ${
                                  data?.firstcontacdetails
                                }`}
                              />
                            </View>
                            <View style={styles.contactTextContainer}>
                              <CustomText text={data?.secondcontacdetails} />
                            </View>
                          </>
                        )}
                        {isLoading && <Loader />}
                      </View>
                    </>
                  )}
                </List.Accordion>
              ) : (
                <Pressable
                  onPress={() => onAccordionPressed(name)}
                  style={[
                    styles.accordionItem,
                    {flexDirection: 'row', alignItems: 'center'},
                  ]}>
                  <View style={styles.CustomizableAccordionTextContainer}>
                    <List.Icon
                      icon={icon}
                      color={COLORS.GRAY}
                      style={{opacity: 0.5}}
                    />
                    <Text style={styles.customAccordionText}>{name}</Text>
                  </View>
                  <List.Icon icon={'chevron-down'} />
                </Pressable>
              );
            }
          }}
          ListFooterComponent={() => (
            <Button
              onPress={() =>
                !!userToken
                  ? authContext.signOut()
                  : navigation.navigate('Auth')
              }>
              {!!userToken ? t('auth:signOut') : t('auth:signIn')}
            </Button>
          )}
        />
      </List.AccordionGroup> */}
    </View>
  );
};

export {Account};

const styles = StyleSheet.create({
  header: {
    height: SCREEN_HEIGHT / 7,
    width: SCREEN_WIDTH,
  },
  body: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  headerContainer: {
    height: SCREEN_HEIGHT * 0.3,
    // backgroundColor: '#684',
  },
  logedInUserInfoContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    //top: -40,
    //backgroundColor: '#ddd',
    height: SCREEN_HEIGHT / 7,
    position: 'absolute',
    top: (SCREEN_HEIGHT * 0.3) / 2,
  },
  userNameContainer: {
    marginStart: 10,
    height: '100%',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  userName: {
    textTransform: 'uppercase',
    fontSize: 17,
  },
  accordionItem: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: COLORS.GRAY,
    height: SCREEN_HEIGHT / 12,
    paddingTop: 0,
    width: SCREEN_WIDTH - 20,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  CustomizableAccordionTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'space-between',
  },
  contactTextContainer: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: 3,
    marginBottom: 3,
    backgroundColor: COLORS.GRAY_LIGHT,
  },
  customerServiceInfoContainer: {
    flex: 1,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customAccordionText: {
    flex: 1,
    color: COLORS.GRAY,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
