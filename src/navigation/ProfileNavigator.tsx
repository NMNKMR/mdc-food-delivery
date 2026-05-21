import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ScreenHeader from "../components/shared/ScreenHeader";
import { radius, spacing } from "../../constants/spacing";
import { useTheme } from "../../context/theme";
import HelpCenterScreen from "../screens/main/HelpCenterScreen";
import ProfileScreen from "../screens/main/ProfileScreen";
import SettingsScreen from "../screens/main/SettingsScreen";
import DrawerContent from "./DrawerContent";
import {
  AppStackParamList,
  ProfileDrawerParamList,
} from "./types";

const Drawer = createDrawerNavigator<ProfileDrawerParamList>();

// MyOrders is never rendered — its drawerItemPress listener bails out and
// pushes the Orders tab on the outer stack instead. The component just has
// to exist for Drawer.Screen to register.
function MyOrdersPlaceholder() {
  return null;
}

export function ProfileNavigator() {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        header: ({ navigation, options }) => (
          <ScreenHeader
            title={options.title}
            onBack={() => navigation.getParent()?.goBack()}
            onMenu={() => navigation.openDrawer()}
          />
        ),
        drawerType: "front",
        drawerStyle: { width: "78%" },
        drawerActiveBackgroundColor: colors.primary,
        drawerInactiveBackgroundColor: "transparent",
        drawerActiveTintColor: colors.onPrimary,
        drawerInactiveTintColor: colors.textPrimary,
        drawerItemStyle: {
          borderRadius: radius.full,
          marginHorizontal: 0,
          marginVertical: spacing.xs / 2,
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "500",
        },
      }}
    >
      <Drawer.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{
          title: "",
          drawerLabel: "My Account",
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="MyOrders"
        component={MyOrdersPlaceholder}
        listeners={({ navigation }) => ({
          drawerItemPress: (e) => {
            e.preventDefault();
            navigation.closeDrawer();
            const stack =
              navigation.getParent<
                NativeStackNavigationProp<AppStackParamList>
              >();
            stack?.navigate("MainTabs", { screen: "Orders" });
          },
        })}
        options={{
          title: "My Orders",
          drawerLabel: "My Orders",
          drawerIcon: ({ color }) => (
            <Ionicons name="receipt-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="HelpCenter"
        component={HelpCenterScreen}
        options={{
          title: "Help Center",
          drawerLabel: "Help Center",
          drawerIcon: ({ color }) => (
            <Ionicons name="help-circle-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          drawerLabel: "Settings",
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
