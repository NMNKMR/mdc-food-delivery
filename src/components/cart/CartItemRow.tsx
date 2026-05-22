import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";
import { CartLine } from "../../../store/cartStore";

type Props = {
  line: CartLine;
  onAdd: () => void;
  onDecrement: () => void;
};

function CartItemRow({ line, onAdd, onDecrement }: Props) {
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

export default CartItemRow;

const styles = StyleSheet.create({
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
});
