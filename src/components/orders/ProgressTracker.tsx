import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TextStyle, View } from "react-native";
import { ActiveOrder } from "../../../constants/data";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";

const STATUS_STEPS: ActiveOrder["status"][] = [
  "placed",
  "preparing",
  "on-the-way",
];

const STATUS_LABEL: Record<ActiveOrder["status"], string> = {
  placed: "Placed",
  preparing: "Preparing",
  "on-the-way": "On the way",
};

const DOT_SIZE = 22;
const LINE_HEIGHT = 3;

type Props = {
  status: ActiveOrder["status"];
};

function ProgressTracker({ status }: Props) {
  const { colors } = useTheme();
  const currentIndex = STATUS_STEPS.indexOf(status);

  return (
    <View style={styles.wrap}>
      <View style={styles.dotsRow}>
        <View style={styles.linesContainer} pointerEvents="none">
          <View
            style={[
              styles.line,
              {
                backgroundColor:
                  currentIndex > 0
                    ? colors.primary
                    : colors.surfaceContainerHigh,
              },
            ]}
          />
          <View
            style={[
              styles.line,
              {
                backgroundColor:
                  currentIndex > 1
                    ? colors.primary
                    : colors.surfaceContainerHigh,
              },
            ]}
          />
        </View>
        {STATUS_STEPS.map((step, i) => {
          const completed = i <= currentIndex;
          return (
            <View key={step} style={styles.step}>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor: completed
                      ? colors.primary
                      : colors.surfaceContainerHigh,
                  },
                ]}
              >
                {completed ? (
                  <Ionicons
                    name="checkmark"
                    size={14}
                    color={colors.onPrimary}
                  />
                ) : null}
              </View>
            </View>
          );
        })}
      </View>
      <View style={styles.labelsRow}>
        {STATUS_STEPS.map((step, i) => {
          const isCurrent = i === currentIndex;
          return (
            <View key={step} style={styles.step}>
              <Text
                style={[
                  typography.labelMd as TextStyle,
                  styles.label,
                  {
                    color: isCurrent
                      ? colors.textPrimary
                      : colors.textSecondary,
                    fontWeight: isCurrent ? "700" : "500",
                  },
                ]}
                numberOfLines={1}
              >
                {STATUS_LABEL[step]}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default ProgressTracker;

const styles = StyleSheet.create({
  wrap: {
    marginTop: spacing.lg,
  },
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  step: {
    flex: 1,
    alignItems: "center",
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  linesContainer: {
    position: "absolute",
    left: "16.67%",
    right: "16.67%",
    top: (DOT_SIZE - LINE_HEIGHT) / 2,
    height: LINE_HEIGHT,
    flexDirection: "row",
  },
  line: {
    flex: 1,
    height: LINE_HEIGHT,
  },
  labelsRow: {
    flexDirection: "row",
    marginTop: spacing.sm,
  },
  label: {
    fontSize: 13,
    textAlign: "center",
  },
});
