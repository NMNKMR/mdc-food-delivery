import { NavigatorScreenParams } from "@react-navigation/native";

export type AuthStackParamList = {
  Onboarding: undefined;
  SignUp: undefined;
  SignIn: undefined;
};

export type ProfileDrawerParamList = {
  ProfileMain: undefined;
  MyOrders: undefined;
  HelpCenter: undefined;
  Settings: undefined;
};

export type AppTabsParamList = {
  Home: undefined;
  Search: undefined;
  Orders: undefined;
};

export type AppStackParamList = {
  MainTabs: NavigatorScreenParams<AppTabsParamList> | undefined;
  ProfileArea: NavigatorScreenParams<ProfileDrawerParamList> | undefined;
  RestaurantDetail: { restaurantId: string };
  Cart: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList, AuthStackParamList {}
  }
}
