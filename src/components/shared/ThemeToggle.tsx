import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { radius } from "../../../constants/spacing";
import { useTheme } from "../../../context/theme";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

type Option = {
  value: ThemeMode;
  icon: IconName;
  label: string;
};

const OPTIONS: Option[] = [
  { value: "light", icon: "sunny", label: "Light theme" },
  { value: "system", icon: "phone-portrait", label: "System theme" },
  { value: "dark", icon: "moon", label: "Dark theme" },
];

function ThemeToggle() {
  const { colors, mode, toggleTheme } = useTheme();

  return (
    <View
      style={[styles.track, { backgroundColor: colors.surfaceContainerHigh }]}
    >
      {OPTIONS.map((opt) => {
        const selected = mode === opt.value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => toggleTheme(opt.value)}
            accessibilityRole="button"
            accessibilityLabel={opt.label}
            accessibilityState={{ selected }}
            style={[
              styles.segment,
              selected && { backgroundColor: colors.primary },
            ]}
          >
            <Ionicons
              name={selected ? opt.icon : ((opt.icon + "-outline") as IconName)}
              size={16}
              color={selected ? colors.onPrimary : colors.iconSecondary}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

export default ThemeToggle;

const styles = StyleSheet.create({
  track: {
    flexDirection: "row",
    borderRadius: radius.full,
    padding: 2,
  },
  segment: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
});
