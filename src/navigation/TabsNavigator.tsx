import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "../components/TabBar";
import HomeScreen from "../screens/main/HomeScreen";
import { OrdersScreen } from "../screens/main/OrdersScreen";
import { SearchScreen } from "../screens/main/SearchScreen";
import { AppTabsParamList } from "./types";

const Tabs = createBottomTabNavigator<AppTabsParamList>();

export function TabsNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Search" component={SearchScreen} />
      <Tabs.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ tabBarLabel: "Orders", title: "My Orders" }}
      />
    </Tabs.Navigator>
  );
}
