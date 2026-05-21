import { StyleSheet, Text, TextStyle, View } from "react-native";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";

export function SearchScreen() {
  const { colors } = useTheme();
  return (
    <View style={[styles.body, { backgroundColor: colors.background }]}>
      <Text style={[typography.headlineMd as TextStyle, { color: colors.textPrimary }]}>
        Search
      </Text>
      <Text style={[typography.bodyMd as TextStyle, { color: colors.textSecondary }]}>
        Search across restaurants and dishes.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, padding: spacing.xl },
});
