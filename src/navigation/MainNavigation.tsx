import React, {Fragment} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Tabs} from './Tabs';
import {
  Search,
  Product,
  CategoryDetailes,
  Favourites,
  MyPurchases,
  OrderDetailes,
  Reviews,
  Cart,
  Account,
  ChangePassword,
  Notifications,
} from '../screens';
import AuthStack from './AuthStack';

const Stack = createStackNavigator();
interface Props {}

const MyPurchasesStack = () => (
  <Fragment>
    <Stack.Navigator
      initialRouteName={'MyPurchases'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyPurchases" component={MyPurchases} />
      <Stack.Screen name="OrderDetailes" component={OrderDetailes} />
    </Stack.Navigator>
  </Fragment>
);
const ProductStack = () => {
  return (
    <Fragment>
      <Stack.Navigator
        initialRouteName={'Product'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Reviews" component={Reviews} />
      </Stack.Navigator>
    </Fragment>
  );
};
const MainNavigation = (props: Props) => {
  return (
    <Fragment>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Tabs">
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Favourites" component={Favourites} />
        <Stack.Screen name="PurchasesStack" component={MyPurchasesStack} />
        <Stack.Screen name="ProductStack" component={ProductStack} />
        <Stack.Screen name="CategoryDetailes" component={CategoryDetailes} />
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Navigator>
    </Fragment>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});
