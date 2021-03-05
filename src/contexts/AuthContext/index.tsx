import React, {ReactNode, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SIGN_IN,
  SIGN_OUT,
  RESTORE_TOKEN,
  USER_TOKEN,
  STORE_DATA,
  USER_DATA,
  SIGN_UP,
  FIRST_INSTALL,
} from './types';
import axios from 'axios';
import {
  API_PATH,
  STORE_PASSWORD,
  STORE_URL,
  STORE_USERNAME,
} from '../../constants/config.constants';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {types} from '@babel/core';
import i18next from '../../localization';
import {I18nManager} from 'react-native';

type userTokenType = string | null;
type storeDataTypes = {token: string; settings: settingsTypes; cookie: string};
interface settingsTypes {
  MainColor?: string | null;
  LogoURL?: string | null;
  StoreSlogan?: string | null;

  StoreName?: string | null;

  LanguageCode?: string | null;
  languages?: string[] | null;
}
interface AuthContextInitialStateTypes {
  isLoading?: boolean;
  isSignout?: boolean;
  userToken?: userTokenType;
  storeToken?: userTokenType;
  settings?: settingsTypes;
  cookie?: string;
  userName: string;
  email: string;
  firstInstall?: boolean;
}
const initialState: AuthContextInitialStateTypes = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  storeToken: null,
  userName: '',
  email: '',
};

type AuthReducerActionType =
  | {type: typeof SIGN_OUT; payload?: any}
  | {
      type: typeof SIGN_IN;
      payload: AuthContextInitialStateTypes;
    }
  | {
      type: typeof RESTORE_TOKEN;
      payload: {userToken: userTokenType; storeToken: userTokenType};
    };
interface AuthContextType {
  signIn: (data: any) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (data: any) => Promise<void>;
  restoreToken: (data?: any) => Promise<void>;
}
type contextType = {
  authContext: AuthContextType;
  state: AuthContextInitialStateTypes;
};
export const AuthenticationContext = React.createContext<contextType>(
  {} as contextType,
);
const reducer = (
  state: AuthContextInitialStateTypes = initialState,
  {type, payload}: AuthReducerActionType,
) => {
  switch (type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        userToken: payload.userToken,
        isLoading: false,
        storeToken: payload.storeToken,
        settings: payload.settings,
        cookie: payload.cookie,
        userName: payload.userData.name,
        email: payload.userData.email,
        isSignout: !!payload.userToken,
        firstInstall: !!payload.firstInstall,
      };
      break;
    case SIGN_IN:
      return {
        ...state,
        userToken: payload,
        isLoading: false,
        isSignout: false,
        userName: payload.userData.name,
        email: payload.userData.email,
      };
      break;
    case SIGN_OUT:
      return {...state, userToken: null, isSignout: true, userName: ''};
      break;
    case SIGN_UP:
      return {
        ...state,
        userToken: payload.userToken,
        userName: payload.userName,
      };
      break;
    default:
      return state;
  }
};
const AuthContext: React.FC = ({children}: {children?: ReactNode}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authContext: AuthContextType = React.useMemo(
    () => ({
      signIn: async ({userToken, userData}) => {
        await AsyncStorage.setItem(USER_TOKEN, userToken);
        await AsyncStorage.setItem(USER_DATA, JSON.stringify(userData));
        dispatch({type: SIGN_IN, payload: {userToken, userData}});
      },
      signOut: async () => {
        await AsyncStorage.removeItem(USER_TOKEN);
        await AsyncStorage.removeItem(USER_DATA);
        dispatch({type: SIGN_OUT});
      },
      signUp: async ({userName, token}) => {
        dispatch({
          type: SIGN_UP,
          payload: {userName, userToken: token},
        });
      },
      restoreToken: async (data) => {
        const userToken = await AsyncStorage.getItem(USER_TOKEN);
        const storeData = await AsyncStorage.getItem(STORE_DATA);
        const userData = await AsyncStorage.getItem(USER_DATA);
        const firstInstall = await AsyncStorage.getItem(FIRST_INSTALL);
        const parsedUserData = !!userData ? await JSON.parse(userData) : {};
        try {
          if (storeData) {
            const parseStoreData: storeDataTypes = await JSON.parse(storeData);
            // console.log({parseStoreData});

            dispatch({
              type: RESTORE_TOKEN,
              payload: {
                userToken,
                storeToken: parseStoreData.token,
                ...parseStoreData,
                userData: parsedUserData,
                firstInstall: !!firstInstall,
              },
            });
          } else {
            const {
              data: {token, settings, cookie},
            }: {
              data: storeDataTypes;
            } = await axios.post(STORE_URL + API_PATH + endpoints.login, {
              username: STORE_USERNAME,
              password: STORE_PASSWORD,
            });

            await AsyncStorage.setItem(
              STORE_DATA,
              JSON.stringify({token, settings, cookie}),
            );

            dispatch({
              type: RESTORE_TOKEN,
              payload: {
                userToken,
                storeToken: token,
                settings,
                cookie,
                firstInstall: !!firstInstall,
              },
            });
          }
        } catch (error) {
          console.log('restore token error', error);
          dispatch({
            type: RESTORE_TOKEN,
            payload: {userToken, storeToken: null},
          });
        }

        data;
      },
    }),
    [],
  );
  return (
    <AuthenticationContext.Provider value={{authContext, state}}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export {AuthContext};
