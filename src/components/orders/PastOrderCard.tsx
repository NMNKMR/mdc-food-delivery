import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { PastOrder } from "../../../constants/data";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";

type Props = {
  order: PastOrder;
};

function PastOrderCard({ order }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <Image source={order.image} style={styles.image} />
      <View style={styles.body}>
        <Text
          style={[
            typography.labelLg as TextStyle,
            { color: colors.textPrimary, fontSize: 15 },
          ]}
          numberOfLines={1}
        >
          {order.restaurantName}
        </Text>
        <Text
          style={[
            typography.bodyMd as TextStyle,
            { color: colors.textSecondary, marginTop: 2 },
          ]}
          numberOfLines={2}
        >
          {order.date} · ₹{order.total}
          {"\n"}
          {order.status === "delivered" ? "Delivered" : "Cancelled"}
        </Text>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.reorderBtn,
          {
            backgroundColor: colors.surfaceContainer,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <Text
          style={[
            typography.labelLg as TextStyle,
            { color: colors.textPrimary, fontSize: 14 },
          ]}
        >
          Reorder
        </Text>
      </Pressable>
    </View>
  );
}

export default PastOrderCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
  },
  body: {
    flex: 1,
    marginHorizontal: spacing.md,
  },
  reorderBtn: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
});
