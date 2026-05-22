import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavDefaultTheme,
  NavigationContainer,
  Theme,
} from "@react-navigation/native";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useTheme } from "../../context/theme";
import { useAuthStore } from "../../store/authStore";
import { AppNavigator } from "./AppNavigator";
import { AuthNavigator } from "./AuthNavigator";
import { linking } from "./linking";

export function RootNavigator() {
  const { colors, isDarkMode } = useTheme();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  const base = isDarkMode ? NavDarkTheme : NavDefaultTheme;
  const navTheme: Theme = {
    ...base,
    colors: {
      ...base.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.textPrimary,
      border: colors.borderSubtle,
      notification: colors.badge,
    },
  };

  const splash = (
    <View style={[styles.splash, { backgroundColor: colors.background }]}>
      <ActivityIndicator color={colors.primary} />
    </View>
  );

  if (!hasHydrated) {
    return splash;
  }

  return (
    <NavigationContainer theme={navTheme} linking={linking} fallback={splash}>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
