import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';

export type RootRouter = {
  LandingScreen: {};
  Tabs: {
    screen: T;
  };
  SelectBranch: {};
  Product: {
    id: string;
  };
  Category: {
    id: string;
    name: string;
  };
  BRAND_SCREEN: {
    id: string;
    categories: Category[];
  };
  SEARCH_SCREEN: {};
  Login: {};

  ForgotPassword: {email: string};

  Register: {};
  IMAGES_GALLERY: {
    /*      images: IImageInfo[];
     */ index: number;
  };
};

export type TabsRouter = {
  Home: {};
  Categories: {};
  Cart: {};
  Favourites: {};
  Offers: {};
};

export type T = 'Home' | 'Categories' | 'Cart' | 'Favourites' | 'Offers';

export type HomeRouter = {
  Home: {};
};

export type HomeParamList = CompositeNavigationProp<
  StackNavigationProp<HomeRouter, 'Home'>,
  CompositeNavigationProp<
    MaterialBottomTabNavigationProp<TabsRouter, 'Home'>,
    StackNavigationProp<RootRouter, 'Tabs'>
  >
>;

export type CategoriesRouter = {
  Categories: {};
};
export interface HomeScreenProps {
  navigation: HomeParamList;
}
