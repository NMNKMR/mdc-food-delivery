import { StyleSheet, Text, TextStyle, View } from "react-native";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";

type Props = {
  label: string;
  value: string;
};

function SummaryRow({ label, value }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.row}>
      <Text
        style={[
          typography.bodyLg as TextStyle,
          { color: colors.textSecondary },
        ]}
      >
        {label}
      </Text>
      <Text
        style={[
          typography.bodyLg as TextStyle,
          { color: colors.textPrimary },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

export default SummaryRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.xs,
  },
});
