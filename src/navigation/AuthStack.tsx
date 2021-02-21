import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Account, ForgetPassword, Login, Register} from '../screens';
import {createStackNavigator} from '@react-navigation/stack';

const Auth = createStackNavigator();
interface Props {}

const AuthStack = (props: Props) => {
  return (
    <Auth.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      {/* <Auth.Screen name="Account" component={Account} /> */}
      <Auth.Screen name="Login" component={Login} />
      <Auth.Screen name="Register" component={Register} />
      <Auth.Screen name="ForgetPassword" component={ForgetPassword} />
    </Auth.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
