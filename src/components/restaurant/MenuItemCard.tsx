import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { MenuItem } from "../../../constants/data";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";
import { useCartStore } from "../../../store/cartStore";

type Props = {
  item: MenuItem;
};

function MenuItemCard({ item }: Props) {
  const { colors } = useTheme();
  const quantity = useCartStore(
    (s) => s.lines.find((l) => l.itemId === item.id)?.quantity ?? 0,
  );
  const add = useCartStore((s) => s.add);
  const decrement = useCartStore((s) => s.decrement);

  const handleAdd = () =>
    add({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={styles.content}>
        <Text
          style={[
            typography.labelLg as TextStyle,
            { color: colors.textPrimary, fontSize: 15 },
          ]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text
          style={[
            typography.bodyMd as TextStyle,
            styles.desc,
            { color: colors.textSecondary },
          ]}
          numberOfLines={2}
        >
          {item.description}
        </Text>
        <Text
          style={[
            typography.labelLg as TextStyle,
            styles.price,
            { color: colors.primary, fontSize: 16 },
          ]}
        >
          ₹{item.price.toFixed(0)}
        </Text>
      </View>

      <View style={styles.imageWrap}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      </View>

      {quantity === 0 ? (
        <Pressable
          onPress={handleAdd}
          style={({ pressed }) => [
            styles.cornerBtn,
            styles.addBtn,
            {
              backgroundColor: colors.primary,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <Text
            style={[
              typography.labelLg as TextStyle,
              { color: colors.onPrimary, fontSize: 14 },
            ]}
          >
            Add
          </Text>
        </Pressable>
      ) : (
        <View
          style={[
            styles.cornerBtn,
            styles.qtyChip,
            { backgroundColor: colors.primary },
          ]}
        >
          <Pressable
            onPress={() => decrement(item.id)}
            hitSlop={6}
            style={styles.qtyBtn}
            accessibilityLabel="Decrease quantity"
          >
            <Ionicons name="remove" size={16} color={colors.onPrimary} />
          </Pressable>
          <Text
            style={[
              typography.labelLg as TextStyle,
              styles.qtyText,
              { color: colors.onPrimary },
            ]}
          >
            {quantity}
          </Text>
          <Pressable
            onPress={handleAdd}
            hitSlop={6}
            style={styles.qtyBtn}
            accessibilityLabel="Increase quantity"
          >
            <Ionicons name="add" size={16} color={colors.onPrimary} />
          </Pressable>
        </View>
      )}
    </View>
  );
}

export default MenuItemCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: radius.lg,
    overflow: "hidden",
    marginBottom: spacing.md,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    minHeight: 124,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  desc: {
    marginTop: 4,
  },
  price: {
    marginTop: spacing.sm,
  },
  imageWrap: {
    width: 100,
    height: 100,
    margin: spacing.md,
    borderRadius: radius.md,
    overflow: "hidden",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cornerBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderTopLeftRadius: radius.lg,
  },
  addBtn: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  qtyChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
  },
  qtyBtn: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: {
    minWidth: 20,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
});
