import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./context/ThemeProvider";
import ThemedStatusBar from "./src/components/shared/ThemedStatusBar";
import { RootNavigator } from "./src/navigation/RootNavigator";

function AppShell() {
  return (
    <>
      <ThemedStatusBar />
      <RootNavigator />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppShell />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
