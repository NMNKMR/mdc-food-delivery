import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileNavigator } from "./ProfileNavigator";
import { TabsNavigator } from "./TabsNavigator";
import { AppStackParamList } from "./types";

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="MainTabs" component={TabsNavigator} />
      <Stack.Screen name="ProfileArea" component={ProfileNavigator} />
    </Stack.Navigator>
  );
}
