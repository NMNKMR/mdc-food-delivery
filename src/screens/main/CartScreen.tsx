import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";
import {
  CartLine,
  useCartStore,
  useCartTotal,
} from "../../../store/cartStore";
import { AppStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AppStackParamList, "Cart">;

const DELIVERY_FEE = 25;
const SERVICE_TAX_RATE = 0.06;

function CartScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const lines = useCartStore((s) => s.lines);
  const subtotal = useCartTotal();
  const add = useCartStore((s) => s.add);
  const decrement = useCartStore((s) => s.decrement);

  const [promo, setPromo] = useState("");

  const hasItems = lines.length > 0;
  const serviceTax = hasItems
    ? Math.round(subtotal * SERVICE_TAX_RATE * 100) / 100
    : 0;
  const total = hasItems ? subtotal + DELIVERY_FEE + serviceTax : 0;

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
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={[styles.backBtn, { backgroundColor: colors.surfaceContainer }]}
          hitSlop={6}
        >
          <Ionicons name="chevron-back" size={22} color={colors.iconPrimary} />
        </Pressable>
        <Text
          style={[
            typography.headlineSm as TextStyle,
            styles.title,
            { color: colors.textPrimary },
          ]}
        >
          Your Cart
        </Text>
      </View>

      {!hasItems ? (
        <View style={styles.empty}>
          <View
            style={[
              styles.emptyIcon,
              { backgroundColor: colors.surfaceContainer },
            ]}
          >
            <Ionicons
              name="bag-outline"
              size={42}
              color={colors.iconSecondary}
            />
          </View>
          <Text
            style={[
              typography.headlineSm as TextStyle,
              { color: colors.textPrimary, marginTop: spacing.lg },
            ]}
          >
            Your cart is empty
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
            Add items from a restaurant to get started.
          </Text>
          <Pressable
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [
              styles.emptyBtn,
              {
                backgroundColor: colors.primary,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Text
              style={[
                typography.labelLg as TextStyle,
                { color: colors.onPrimary, fontSize: 15 },
              ]}
            >
              Browse Restaurants
            </Text>
          </Pressable>
        </View>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: spacing.xl,
              paddingBottom: insets.bottom + 110,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.section}>
              {lines.map((line) => (
                <CartItemRow
                  key={line.itemId}
                  line={line}
                  onAdd={() =>
                    add({
                      id: line.itemId,
                      name: line.name,
                      price: line.price,
                      image: line.image,
                    })
                  }
                  onDecrement={() => decrement(line.itemId)}
                />
              ))}
            </View>

            <View
              style={[styles.card, { backgroundColor: colors.surface }]}
            >
              <View style={styles.addressHeader}>
                <View style={styles.addressTitleRow}>
                  <Ionicons
                    name="location-outline"
                    size={20}
                    color={colors.primary}
                  />
                  <Text
                    style={[
                      typography.labelLg as TextStyle,
                      styles.addressLabel,
                      { color: colors.textPrimary, fontSize: 15 },
                    ]}
                  >
                    Delivery Address
                  </Text>
                </View>
                <Pressable hitSlop={6}>
                  <Text
                    style={[
                      typography.labelLg as TextStyle,
                      { color: colors.primary },
                    ]}
                  >
                    Change
                  </Text>
                </Pressable>
              </View>
              <Text
                style={[
                  typography.bodyLg as TextStyle,
                  styles.addressLine,
                  { color: colors.textPrimary },
                ]}
              >
                Home
              </Text>
              <Text
                style={[
                  typography.bodyMd as TextStyle,
                  { color: colors.textSecondary },
                ]}
              >
                Goel Niwas, Gurugram, 122001
              </Text>
            </View>

            <View style={styles.promoRow}>
              <View
                style={[
                  styles.promoInput,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.borderSubtle,
                  },
                ]}
              >
                <Ionicons
                  name="pricetag-outline"
                  size={18}
                  color={colors.iconSecondary}
                />
                <TextInput
                  value={promo}
                  onChangeText={setPromo}
                  placeholder="Promo Code"
                  placeholderTextColor={colors.textPlaceholder}
                  style={[
                    styles.promoInputText,
                    { color: colors.textPrimary },
                  ]}
                />
              </View>
              <Pressable
                style={({ pressed }) => [
                  styles.applyBtn,
                  {
                    backgroundColor: colors.primaryDark,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <Text
                  style={[
                    typography.labelLg as TextStyle,
                    { color: colors.onPrimary, fontSize: 15 },
                  ]}
                >
                  Apply
                </Text>
              </Pressable>
            </View>

            <View
              style={[
                styles.card,
                styles.summaryCard,
                { backgroundColor: colors.surface },
              ]}
            >
              <Text
                style={[
                  typography.headlineSm as TextStyle,
                  { color: colors.textPrimary, fontSize: 18 },
                ]}
              >
                Order Summary
              </Text>
              <View
                style={[
                  styles.summaryDivider,
                  { backgroundColor: colors.divider },
                ]}
              />
              <SummaryRow
                label="Subtotal"
                value={`₹${subtotal.toFixed(2)}`}
                colors={colors}
              />
              <SummaryRow
                label="Delivery Fee"
                value={`₹${DELIVERY_FEE.toFixed(2)}`}
                colors={colors}
              />
              <SummaryRow
                label="Service Tax"
                value={`₹${serviceTax.toFixed(2)}`}
                colors={colors}
              />
              <View
                style={[
                  styles.summaryDivider,
                  { backgroundColor: colors.divider },
                ]}
              />
              <View style={styles.totalRow}>
                <Text
                  style={[
                    typography.headlineSm as TextStyle,
                    { color: colors.textPrimary, fontSize: 18 },
                  ]}
                >
                  Total
                </Text>
                <Text
                  style={[
                    typography.headlineSm as TextStyle,
                    { color: colors.primary, fontSize: 20 },
                  ]}
                >
                  ₹{total.toFixed(2)}
                </Text>
              </View>
            </View>
          </ScrollView>

          <View
            style={[
              styles.footer,
              {
                paddingBottom: insets.bottom + spacing.sm,
                backgroundColor: colors.background,
              },
            ]}
          >
            <Pressable
              style={({ pressed }) => [
                styles.placeOrderBtn,
                {
                  backgroundColor: colors.primaryDark,
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
            >
              <Text
                style={[
                  typography.labelLg as TextStyle,
                  { color: colors.onPrimary, fontSize: 16 },
                ]}
              >
                Place Order
              </Text>
              <Ionicons name="arrow-forward" size={18} color={colors.onPrimary} />
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

type CartItemRowProps = {
  line: CartLine;
  onAdd: () => void;
  onDecrement: () => void;
};

function CartItemRow({ line, onAdd, onDecrement }: CartItemRowProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.itemCard, { backgroundColor: colors.surface }]}>
      <Image source={line.image} style={styles.itemImage} resizeMode="cover" />
      <View style={styles.itemBody}>
        <View style={styles.itemTopRow}>
          <Text
            style={[
              typography.labelLg as TextStyle,
              styles.itemName,
              { color: colors.textPrimary, fontSize: 15 },
            ]}
            numberOfLines={1}
          >
            {line.name}
          </Text>
          <Text
            style={[
              typography.labelLg as TextStyle,
              { color: colors.textPrimary, fontSize: 15 },
            ]}
          >
            ₹{(line.price * line.quantity).toFixed(2)}
          </Text>
        </View>

        <View style={styles.itemBottomRow}>
          <Text
            style={[
              typography.bodyMd as TextStyle,
              { color: colors.primary },
            ]}
          >
            ₹{line.price.toFixed(0)} each
          </Text>
          <View
            style={[
              styles.stepper,
              { backgroundColor: colors.surfaceContainer },
            ]}
          >
            <Pressable
              onPress={onDecrement}
              hitSlop={6}
              style={styles.stepBtn}
              accessibilityLabel="Decrease quantity"
            >
              <Ionicons name="remove" size={16} color={colors.iconPrimary} />
            </Pressable>
            <Text
              style={[
                typography.labelLg as TextStyle,
                styles.stepCount,
                { color: colors.textPrimary },
              ]}
            >
              {line.quantity}
            </Text>
            <Pressable
              onPress={onAdd}
              hitSlop={6}
              style={styles.stepBtn}
              accessibilityLabel="Increase quantity"
            >
              <Ionicons name="add" size={16} color={colors.iconPrimary} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
  colors: ReturnType<typeof useTheme>["colors"];
};

function SummaryRow({ label, value, colors }: SummaryRowProps) {
  return (
    <View style={styles.summaryRow}>
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

export default CartScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginLeft: spacing.md,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xxxl,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyBtn: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
  },
  section: {
    marginTop: spacing.sm,
  },
  itemCard: {
    flexDirection: "row",
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  itemImage: {
    width: 72,
    height: 72,
    borderRadius: radius.md,
  },
  itemBody: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: "space-between",
  },
  itemTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    flex: 1,
    marginRight: spacing.sm,
  },
  itemBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.sm,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.full,
    paddingHorizontal: spacing.xs,
  },
  stepBtn: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  stepCount: {
    minWidth: 20,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.md,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  addressTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressLabel: {
    marginLeft: spacing.sm,
  },
  addressLine: {
    marginTop: spacing.xs,
    fontWeight: "500",
  },
  promoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.md,
    gap: spacing.md,
  },
  promoInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderRadius: radius.full,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
  },
  promoInputText: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 14,
    padding: 0,
  },
  applyBtn: {
    height: 48,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  summaryCard: {
    marginTop: spacing.md,
  },
  summaryDivider: {
    height: 1,
    marginVertical: spacing.md,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.xs,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
  placeOrderBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    borderRadius: radius.full,
    gap: spacing.sm,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
  },
});
