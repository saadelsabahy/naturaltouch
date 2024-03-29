import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {Cart, Categories, Home, More, Offers} from '../screens';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../constants/style';
import AuthStack from './AuthStack';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {cartContext} from '../contexts';
import {SCREEN_HEIGHT} from '../constants/style/sizes';
interface tabBarOPtionsProps {
  iconName: string;
  iconSize?: number;
  label: string;
}
interface Props {}
const Tab = createBottomTabNavigator();

const tabBarOPtions = ({
  iconName,
  iconSize,
  label,
}: tabBarOPtionsProps): BottomTabNavigationOptions => {
  return {
    tabBarIcon: ({color, focused}) => (
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 40 / 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: focused ? COLORS.MAINCOLOR : undefined,
          marginVertical: focused ? 3 : 0,
        }}>
        <Icon
          color={focused ? COLORS.WHITE : color}
          name={iconName}
          size={iconSize || 24}
        />
      </View>
    ),
    tabBarLabel: ({focused, color}) =>
      focused ? (
        <Text style={[styles.tabBarText, {color}]}>{label}</Text>
      ) : null,
  };
};
const Tabs = () => {
  const {t, i18n} = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="history"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        style: {height: SCREEN_HEIGHT / 11},
        inactiveTintColor: COLORS.MAINCOLOR,
      }}>
      <Tab.Screen
        name="More"
        component={More}
        options={{
          ...tabBarOPtions({
            iconName: 'menu',
            label: t('tabs:more'),
          }),

          tabBarBadgeStyle: {
            backgroundColor: COLORS.MAINCOLOR,
            color: COLORS.WHITE,
          },
        }}
      />
      <Tab.Screen
        name="AccountStack"
        component={AuthStack}
        options={{
          tabBarVisible: false,
          ...tabBarOPtions({
            iconName: 'file-account-outline',
            label: t('tabs:account'),
          }),
        }}
      />

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          ...tabBarOPtions({iconName: 'home-outline', label: t('tabs:home')}),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          ...tabBarOPtions({
            iconName: 'view-grid-outline',
            label: t('tabs:categories'),
          }),
        }}
      />
      <Tab.Screen
        name="Offers"
        component={Offers}
        options={{
          ...tabBarOPtions({
            iconName: 'gift-outline',
            label: t('tabs:offers'),
          }),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabBarText: {
    textTransform: 'capitalize',
    fontSize: 10,
  },
});

export {Tabs};
