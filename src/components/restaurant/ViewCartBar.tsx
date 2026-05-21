import { Pressable, StyleSheet, Text, TextStyle, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  count: number;
  total: number;
  onPress: () => void;
};

function ViewCartBar({ count, onPress }: Props) {
  const { colors, isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: insets.bottom + spacing.sm }]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.bar,
          {
            backgroundColor: colors.primary,
            opacity: pressed ? 0.9 : 1,
            shadowColor: "#000",
          },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <View
            style={[
              styles.countChip,
              {
                backgroundColor: isDarkMode
                  ? colors.primaryDark
                  : "rgba(0,0,0,0.18)",
              },
            ]}
          >
            <Text
              style={[
                typography.labelLg as TextStyle,
                { color: colors.onPrimary, fontSize: 14 },
              ]}
            >
              {count}
            </Text>
          </View>
          <Text style={{ marginLeft: 4, color: colors.onPrimary }}>
            Items Added
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Text
            style={[
              typography.labelLg as TextStyle,
              { color: colors.onPrimary, fontSize: 16 },
            ]}
          >
            View Cart
          </Text>
          <Ionicons name="chevron-forward" size={16} color={colors.onPrimary} />
        </View>
      </Pressable>
    </View>
  );
}

export default ViewCartBar;

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
  },
  countChip: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
});
