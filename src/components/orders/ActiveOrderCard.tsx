import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { ActiveOrder } from "../../../constants/data";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";
import ProgressTracker from "./ProgressTracker";

type Props = {
  order: ActiveOrder;
};

function ActiveOrderCard({ order }: Props) {
  const { colors } = useTheme();

  return (
    <>
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <View style={styles.topRow}>
          <Image source={order.image} style={styles.image} />
          <View style={styles.topBody}>
            <Text
              style={[
                typography.labelLg as TextStyle,
                { color: colors.textPrimary, fontSize: 16 },
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
              numberOfLines={1}
            >
              Order #{order.orderNumber} · {order.itemCount} items
            </Text>
          </View>
          <View style={styles.etaWrap}>
            <Text
              style={[
                typography.headlineSm as TextStyle,
                { color: colors.primary, fontSize: 18 },
              ]}
            >
              {order.etaMinutes} min
            </Text>
            <Text
              style={[
                typography.caption as TextStyle,
                styles.etaLabel,
                { color: colors.textSecondary },
              ]}
            >
              ESTIMATED{"\n"}ARRIVAL
            </Text>
          </View>
        </View>

        <ProgressTracker status={order.status} />

        <View style={styles.actionRow}>
          <Pressable
            style={({ pressed }) => [
              styles.trackBtn,
              {
                borderColor: colors.primary,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text
              style={[
                typography.labelLg as TextStyle,
                { color: colors.primary, fontSize: 15 },
              ]}
            >
              Track Order
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.helpBtn,
              { backgroundColor: colors.surfaceContainer },
            ]}
            accessibilityLabel="Get help with this order"
          >
            <Ionicons
              name="help-circle-outline"
              size={22}
              color={colors.iconSecondary}
            />
          </Pressable>
        </View>
      </View>

      {order.rider ? (
        <View
          style={[
            styles.riderBanner,
            {
              backgroundColor: colors.primaryMuted,
              borderColor: colors.primaryContainer,
            },
          ]}
        >
          <Ionicons
            name="bicycle"
            size={22}
            color={colors.primary}
            style={styles.riderIcon}
          />
          <Text
            style={[
              typography.bodyMd as TextStyle,
              styles.riderText,
              { color: colors.textPrimary },
            ]}
          >
            <Text style={{ fontWeight: "700" }}>Rider Assigned:</Text>{" "}
            {order.rider.name} is picking up your order from{" "}
            {order.restaurantName}.
          </Text>
        </View>
      ) : null}
    </>
  );
}

export default ActiveOrderCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
  },
  topBody: {
    flex: 1,
    marginLeft: spacing.md,
  },
  etaWrap: {
    alignItems: "flex-end",
  },
  etaLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.6,
    textAlign: "right",
    marginTop: 2,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  trackBtn: {
    flex: 1,
    height: 48,
    borderRadius: radius.full,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  helpBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  riderBanner: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.lg,
    marginTop: spacing.md,
  },
  riderIcon: {
    marginRight: spacing.md,
  },
  riderText: {
    flex: 1,
    lineHeight: 20,
  },
});
