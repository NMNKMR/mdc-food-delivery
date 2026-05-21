import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "../../context/theme";
import CartScreen from "../screens/main/CartScreen";
import RestaurantDetailScreen from "../screens/main/RestaurantDetailScreen";
import { ProfileNavigator } from "./ProfileNavigator";
import { TabsNavigator } from "./TabsNavigator";
import { AppStackParamList } from "./types";

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="MainTabs" component={TabsNavigator} />
      <Stack.Screen name="ProfileArea" component={ProfileNavigator} />
      <Stack.Screen
        name="RestaurantDetail"
        options={{ animation: "fade_from_bottom" }}
        component={RestaurantDetailScreen}
      />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}
