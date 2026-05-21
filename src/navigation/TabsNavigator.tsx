import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { activeOrders } from "../../constants/data";
import CustomTabBar from "../components/TabBar";
import HomeScreen from "../screens/main/HomeScreen";
import { OrdersScreen } from "../screens/main/OrdersScreen";
import { SearchScreen } from "../screens/main/SearchScreen";
import { AppTabsParamList } from "./types";

const Tabs = createBottomTabNavigator<AppTabsParamList>();

export function TabsNavigator() {
  const activeOrderCount = activeOrders.length;

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
        options={{
          tabBarLabel: "Orders",
          title: "My Orders",
          tabBarBadge: activeOrderCount > 0 ? activeOrderCount : undefined,
        }}
      />
    </Tabs.Navigator>
  );
}
