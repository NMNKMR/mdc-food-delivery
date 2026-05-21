import { Pressable, StyleSheet, Text, TextStyle } from "react-native";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";

type Props = {
  label: string;
  active: boolean;
  onPress: () => void;
};

function TabPill({ label, active, onPress }: Props) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pill,
        {
          backgroundColor: active
            ? colors.primaryDark
            : colors.surfaceContainer,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <Text
        style={[
          typography.labelLg as TextStyle,
          {
            color: active ? colors.onPrimary : colors.textSecondary,
            fontSize: 15,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default TabPill;

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
  },
});
