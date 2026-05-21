import { StyleSheet, Text, TextStyle, View } from "react-native";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";

export function OrdersScreen() {
  const { colors } = useTheme();
  return (
    <View style={[styles.body, { backgroundColor: colors.background }]}>
      <Text style={[typography.headlineMd as TextStyle, { color: colors.textPrimary }]}>
        My Orders
      </Text>
      <Text style={[typography.bodyMd as TextStyle, { color: colors.textSecondary }]}>
        Active and past orders will appear here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, padding: spacing.xl },
});
