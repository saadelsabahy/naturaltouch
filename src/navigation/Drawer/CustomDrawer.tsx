// import React, {useState, useCallback} from 'react';
// import {I18nManager, Pressable, StyleSheet, Text, View} from 'react-native';
// import {FlatList, ScrollView} from 'react-native-gesture-handler';
// import {Button, IconButton, List} from 'react-native-paper';
// import {CustomText} from '../../components';
// import {COLORS, COMMON_STYLES} from '../../constants/style';
// import {SCREEN_HEIGHT} from '../../constants/style/sizes';
// import {Drawer} from 'react-native-paper';
// import {
//   DrawerScreenProps,
//   DrawerNavigationProp,
// } from '@react-navigation/drawer';
// import {useTranslation} from 'react-i18next';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNRestart from 'react-native-restart';
// import useAxios from '../../hooks/useAxios';
// import {endpoints} from '../../constants/apiEndpoints.constants';
// import useCategory from '../../hooks/useCategory';
// import {categoriesInterface} from '../../interfaces/categories';
// import Reactotron from 'reactotron-react-native';
// import {useCurrency} from '../../hooks/useCurrency';
// interface Props {}
// const categories = [
//   {name: 'fashion'},
//   {name: 'fashion'},
//   {name: 'fashion'},
//   {name: 'fashion'},
//   {name: 'fashion'},
//   {name: 'fashion'},
//   {name: 'fashion'},
//   {name: 'fashion'},
//   {name: 'fashion'},
// ];
// const CustomDrawer = ({navigation}: Props) => {
//   const {t, i18n} = useTranslation();
//   const Axios = useAxios();
//   const {currencies, changeCurrency, selectedCurrency} = useCurrency();
//   const {data: categories} = useCategory();
//   const [selectedLanguage, setselectedLanguage] = useState(
//     I18nManager.isRTL ? 'ar' : 'en',
//   );
//   const closeDrawer = () => {
//     navigation.closeDrawer();
//   };
//   const onItemPressed = ({
//     category_id,
//     seller_id,
//     name,
//     description,
//     image,
//   }: categoriesInterface) => {
//     navigation.navigate('CategoryDetailes', {id: category_id, name});
//   };
//   const onCurrencyItemPressed = (currency: string) => {
//     changeCurrency(currency);
//   };
//   /*  const onlanguageItemPressed = (language: string) => {
//     console.log('languageItemPressed', language);
//   }; */
//   const onlanguageItemPressed = useCallback(
//     async (language: string) => {
//       // const language_code = I18nManager.isRTL ? 'en' : 'ar';
//       try {
//         await Axios.post(endpoints.switchLanguage, {
//           language_code: language,
//         });
//         await i18n.changeLanguage(language);
//       } catch (e) {
//         console.log('switch lang error', e);
//       }
//     },
//     [i18n, selectedLanguage],
//   );

//   return (
//     <View style={[styles.container]}>
//       <View style={[styles.menueContainer]}>
//         <CustomText text={t('drawer:menu')} textStyle={styles.menueText} />
//       </View>
//       <View style={{height: '40%', marginBottom: 5}}>
//         <FlatList
//           data={categories}
//           keyExtractor={(item, index) => `${index}`}
//           renderItem={({item, item: {name}, index}) => {
//             return (
//               <Pressable
//                 style={({pressed}) => [styles.drawerItem]}
//                 onPress={() => onItemPressed(item)}>
//                 <CustomText text={name} />
//                 <IconButton
//                   icon={{
//                     source: 'chevron-right',
//                     direction: I18nManager.isRTL ? 'rtl' : 'ltr',
//                   }}
//                   disabled
//                   size={40}
//                   style={styles.iconButton}
//                 />
//               </Pressable>
//             );
//           }}
//         />
//       </View>
//       <ScrollView>
//         <List.AccordionGroup>
//           {!!currencies && (
//             <List.Accordion
//               theme={{colors: {text: COLORS.WHITE}}}
//               title={selectedCurrency}
//               titleStyle={styles.capitalWhiteText}
//               id="1"
//               style={[
//                 styles.drawerItem,
//                 {
//                   borderBottomWidth: 0,
//                   backgroundColor: COLORS.MAINCOLOR,
//                   marginBottom: 2,
//                 },
//               ]}>
//               <View>
//                 <FlatList
//                   data={currencies && Object.values(currencies)}
//                   keyExtractor={(item, index) => `${index}`}
//                   renderItem={({item, index}) => {
//                     return (
//                       <List.Item
//                         style={[
//                           styles.drawerItem,
//                           {
//                             backgroundColor:
//                               selectedCurrency == item.code
//                                 ? COLORS.MAINCOLOR
//                                 : COLORS.GRAY_LIGHT,
//                           },
//                         ]}
//                         title={item?.code}
//                         onPress={() => onCurrencyItemPressed(item.code)}
//                       />
//                     );
//                   }}
//                 />
//               </View>
//             </List.Accordion>
//           )}
//           <List.Accordion
//             title={selectedLanguage == 'ar' ? 'العربيه' : 'english'}
//             id="2"
//             titleStyle={styles.capitalWhiteText}
//             theme={{colors: {text: COLORS.WHITE}}}
//             style={[
//               styles.drawerItem,
//               {
//                 borderBottomWidth: 0,
//                 backgroundColor: COLORS.MAINCOLOR,
//                 marginBottom: 2,
//               },
//             ]}>
//             <List.Item
//               title="english"
//               onPress={() => onlanguageItemPressed('en')}
//             />
//             <List.Item
//               title="العربيه"
//               onPress={() => onlanguageItemPressed('ar')}
//             />
//           </List.Accordion>
//         </List.AccordionGroup>
//       </ScrollView>
//       <Button
//         onPress={closeDrawer}
//         style={COMMON_STYLES.deleteBorderRadius}
//         labelStyle={styles.buttonLabel}
//         mode="contained">
//         {t('drawer:close')}
//       </Button>
//     </View>
//   );
// };

// export default CustomDrawer;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.GRAY_LIGHT,
//     justifyContent: 'space-between',
//   },
//   menueContainer: {
//     width: '100%',
//     height: SCREEN_HEIGHT / 7,
//     backgroundColor: COLORS.WHITE,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   menueText: {
//     fontSize: 17,
//     color: COLORS.GRAY,
//     fontWeight: '700',
//   },
//   button: {
//     borderRadius: 0,
//   },
//   buttonLabel: {
//     color: COLORS.WHITE,
//   },
//   drawerItem: {
//     width: '100%',
//     height: SCREEN_HEIGHT / 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingStart: 10,
//     borderColor: COLORS.GRAY,
//     borderBottomWidth: 1,
//   },
//   iconButton: {
//     marginHorizontal: 0,
//     marginEnd: 0,
//     marginStart: 0,
//     //backgroundColor: '#ddd',
//     opacity: 1,
//   },
//   capitalWhiteText: {
//     color: COLORS.WHITE,
//     textTransform: 'uppercase',
//     fontSize: 17,
//   },
// });
