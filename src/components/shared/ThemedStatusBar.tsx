import { StatusBar } from "expo-status-bar";
import { useTheme } from "../../../context/theme";

function ThemedStatusBar() {
  const { isDarkMode } = useTheme();
  return <StatusBar style={isDarkMode ? "light" : "dark"} />;
}

export default ThemedStatusBar;
