import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, TextStyle, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";

type Props = {
  title?: string;
  onBack?: () => void;
  onMenu?: () => void;
};

function ScreenHeader({ title, onBack, onMenu }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.row,
        { paddingTop: insets.top + spacing.md },
      ]}
    >
      {onBack ? (
        <Pressable
          onPress={onBack}
          hitSlop={6}
          accessibilityLabel="Go back"
          style={[styles.btn, { backgroundColor: colors.surfaceContainer }]}
        >
          <Ionicons name="chevron-back" size={22} color={colors.iconPrimary} />
        </Pressable>
      ) : (
        <View style={styles.btnPlaceholder} />
      )}

      {title ? (
        <Text
          style={[
            typography.headlineSm as TextStyle,
            styles.title,
            { color: colors.textPrimary },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
      ) : (
        <View style={styles.flex} />
      )}

      {onMenu ? (
        <Pressable
          onPress={onMenu}
          hitSlop={6}
          accessibilityLabel="Open menu"
          style={[styles.btn, { backgroundColor: colors.surfaceContainer }]}
        >
          <Ionicons name="menu" size={22} color={colors.iconPrimary} />
        </Pressable>
      ) : (
        <View style={styles.btnPlaceholder} />
      )}
    </View>
  );
}

export default ScreenHeader;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPlaceholder: {
    width: 40,
    height: 40,
  },
  flex: {
    flex: 1,
  },
  title: {
    flex: 1,
    textAlign: "center",
    marginHorizontal: spacing.md,
  },
});
