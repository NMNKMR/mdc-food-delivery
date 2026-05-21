import { useFocusEffect } from "@react-navigation/native";
import { setStatusBarStyle } from "expo-status-bar";
import { useCallback } from "react";
import { useTheme } from "../../context/theme";

type Style = "light" | "dark";

// Override the status bar style for the duration this screen is focused.
// Restores the themed default on blur so other screens fall back to the
// global <ThemedStatusBar /> behaviour without needing to opt in.
export function useStatusBarStyle(style: Style) {
  const { isDarkMode } = useTheme();

  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle(style);
      return () => {
        setStatusBarStyle(isDarkMode ? "light" : "dark");
      };
    }, [style, isDarkMode]),
  );
}
