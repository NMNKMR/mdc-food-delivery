import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, TextStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";

type Props = {
  onPress: () => void;
  hasCart: boolean;
};

function FloatingMenuButton({ onPress, hasCart }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel="Open menu"
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.btn,
        {
          right: spacing.xl,
          bottom: insets.bottom + (hasCart ? 88 : 24),
          backgroundColor: colors.buttonSecondary,
          opacity: pressed ? 0.92 : 1,
        },
      ]}
    >
      <Ionicons
        name="restaurant-outline"
        size={18}
        color={colors.buttonTextSecondary}
      />
      <Text
        style={[
          typography.labelLg as TextStyle,
          styles.label,
          { color: colors.buttonTextSecondary },
        ]}
      >
        Menu
      </Text>
    </Pressable>
  );
}

export default FloatingMenuButton;

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    height: 48,
    borderRadius: 24,
    gap: spacing.sm,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  label: {
    fontSize: 15,
  },
});
