/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
import React from 'react';
import {I18nextProvider} from 'react-i18next';
import {StyleSheet, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClientProvider, QueryClient} from 'react-query';
import {
  AuthContext,
  CartProvider,
  FavouritesProvider,
  FilterProvider,
  NetworkProvider,
  SnackBarProvider,
} from './src/contexts';
import AppNavigation from './src/navigation';
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import i18next from './src/localization';
import {COLORS, FONTS} from './src/constants/style';
import {LogBox} from 'react-native';
import {Theme} from 'react-native-paper/lib/typescript/types';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.MAINCOLOR,
    text: COLORS.GRAY,
  },
  fonts: configureFonts({
    ios: FONTS,
    android: FONTS,
    default: FONTS,
  }),
};
const queryClient = new QueryClient();
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.WHITE} />
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18next}>
          <NetworkProvider>
            <AuthContext>
              <PaperProvider theme={theme}>
                <SafeAreaProvider style={styles.container}>
                  <SnackBarProvider>
                    <FavouritesProvider>
                      <CartProvider>
                        <FilterProvider>
                          <AppNavigation />
                        </FilterProvider>
                      </CartProvider>
                    </FavouritesProvider>
                  </SnackBarProvider>
                </SafeAreaProvider>
              </PaperProvider>
            </AuthContext>
          </NetworkProvider>
        </I18nextProvider>
      </QueryClientProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});

export default App;
