import React, {useContext, useEffect} from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigatorTheme,
} from '@react-navigation/native';

import {COLORS} from '../constants/style';
import MainNavigation from './MainNavigation';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {AuthenticationContext} from '../contexts/AuthContext';
import {Loader, NoInternet} from '../components';
import {Portal, Snackbar} from 'react-native-paper';
import {cartContext, NetworkContext, SnackBarContext} from '../contexts';

interface Props {}

const AppNavigation = (props: Props) => {
  const {
    authContext,
    state: {isLoading, storeToken},
  } = useContext(AuthenticationContext);
  const {snakbarMessage, hideSnackbar, snakbarType} = useContext(
    SnackBarContext,
  );
  const {isOnline} = useContext(NetworkContext);

  useEffect(() => {
    authContext.restoreToken();
  }, []);

  if (isLoading || !storeToken) {
    return <Loader />;
  }

  return (
    <>
      {!isOnline && <NoInternet />}
      <NavigationContainer
        theme={{
          ...NavigatorTheme,
          colors: {
            ...NavigatorTheme.colors,
            primary: COLORS.MAINCOLOR,
            text: COLORS.GRAY,
          },
        }}>
        <MainNavigation />
      </NavigationContainer>
      <Portal>
        <Snackbar
          duration={2500}
          visible={!!snakbarMessage}
          onDismiss={hideSnackbar}
          style={[
            styles.snackbar,
            {
              backgroundColor: snakbarType
                ? COLORS.MOCK_BG_RED
                : COLORS.MAINCOLOR,
            },
          ]}>
          {snakbarMessage}
        </Snackbar>
      </Portal>
    </>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: COLORS.MOCK_BG_RED,
    margin: 0,
    borderRadius: 0,
  },
});
/* 
 
*/
