import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { AppStackParamList, AuthStackParamList } from "./types";

export const linking: LinkingOptions<AppStackParamList & AuthStackParamList> = {
  prefixes: [Linking.createURL("/"), "nutrigo://", "https://nutrigo.app"],
  config: {
    screens: {
      // Auth stack — resolved while the user is signed out
      Onboarding: "welcome",
      SignUp: "signup",
      SignIn: "signin",
      // App stack — resolved while the user is signed in
      MainTabs: {
        screens: {
          Home: "home",
          Search: "search",
          Orders: "orders",
        },
      },
      ProfileArea: {
        screens: {
          ProfileMain: "account",
          HelpCenter: "help",
          Settings: "settings",
        },
      },
      RestaurantDetail: "restaurant/:restaurantId",
      Cart: "cart",
    },
  },
};
