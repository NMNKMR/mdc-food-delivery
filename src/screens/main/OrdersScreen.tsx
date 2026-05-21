import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  activeOrders,
  PastOrder,
  pastOrders,
} from "../../../constants/data";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";
import ActiveOrderCard from "../../components/orders/ActiveOrderCard";
import PastOrderCard from "../../components/orders/PastOrderCard";
import TabPill from "../../components/orders/TabPill";

type Tab = "active" | "past";

export function OrdersScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<Tab>("active");

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top + spacing.sm,
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + 120,
          paddingHorizontal: spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={[
            typography.headlineMd as TextStyle,
            styles.title,
            { color: colors.textPrimary },
          ]}
        >
          My Orders
        </Text>

        <View style={styles.tabsRow}>
          <TabPill
            label="Active Orders"
            active={tab === "active"}
            onPress={() => setTab("active")}
          />
          <TabPill
            label="Past Orders"
            active={tab === "past"}
            onPress={() => setTab("past")}
          />
        </View>

        {tab === "active" ? <ActiveTab /> : <PastTab orders={pastOrders} />}
      </ScrollView>
    </View>
  );
}

function ActiveTab() {
  const { colors } = useTheme();

  if (activeOrders.length === 0) {
    return (
      <View style={styles.emptyWrap}>
        <View
          style={[
            styles.emptyIcon,
            { backgroundColor: colors.surfaceContainer },
          ]}
        >
          <Ionicons
            name="receipt-outline"
            size={36}
            color={colors.iconSecondary}
          />
        </View>
        <Text
          style={[
            typography.headlineSm as TextStyle,
            { color: colors.textPrimary, marginTop: spacing.lg },
          ]}
        >
          No active orders
        </Text>
        <Text
          style={[
            typography.bodyMd as TextStyle,
            {
              color: colors.textSecondary,
              marginTop: spacing.xs,
              textAlign: "center",
            },
          ]}
        >
          Your in-progress orders will appear here.
        </Text>
      </View>
    );
  }

  return (
    <View>
      {activeOrders.map((order) => (
        <ActiveOrderCard key={order.id} order={order} />
      ))}

      <View style={styles.recentHeader}>
        <Text
          style={[
            typography.headlineSm as TextStyle,
            { color: colors.textPrimary, fontSize: 18 },
          ]}
        >
          Recent Orders
        </Text>
        <Pressable hitSlop={6}>
          <Text
            style={[
              typography.labelLg as TextStyle,
              { color: colors.primary },
            ]}
          >
            View History
          </Text>
        </Pressable>
      </View>

      {pastOrders.slice(0, 2).map((order) => (
        <PastOrderCard key={order.id} order={order} />
      ))}
    </View>
  );
}

function PastTab({ orders }: { orders: PastOrder[] }) {
  const { colors } = useTheme();

  if (orders.length === 0) {
    return (
      <View style={styles.emptyWrap}>
        <Text
          style={[
            typography.bodyMd as TextStyle,
            { color: colors.textSecondary },
          ]}
        >
          No past orders yet.
        </Text>
      </View>
    );
  }

  return (
    <View>
      {orders.map((order) => (
        <PastOrderCard key={order.id} order={order} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  title: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  tabsRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  recentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.xxl,
    marginBottom: spacing.md,
  },
  emptyWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.huge,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
});
