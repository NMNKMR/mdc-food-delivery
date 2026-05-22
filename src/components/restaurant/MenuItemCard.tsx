import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { MenuItem, Nutrition, VegType } from "../../../constants/data";
import { lightColors } from "../../../constants/colors";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";
import { useCartStore } from "../../../store/cartStore";

type Props = {
  item: MenuItem;
  showDivider?: boolean;
};

function MenuItemCard({ item, showDivider = true }: Props) {
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
    <View style={styles.wrap}>
      <View style={styles.row}>
        <View style={styles.content}>
          <VegBadge type={item.vegType} />
          <Text
            style={[
              typography.labelLg as TextStyle,
              styles.name,
              { color: colors.textPrimary },
            ]}
            numberOfLines={2}
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
          <NutritionRow nutrition={item.nutrition} />
          <Text
            style={[
              typography.labelLg as TextStyle,
              styles.price,
              { color: colors.textPrimary },
            ]}
          >
            ₹{item.price.toFixed(0)}
          </Text>
        </View>

        <View style={styles.imageCol}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />
          <View style={styles.actionWrap}>
            {quantity === 0 ? (
              <Pressable
                onPress={handleAdd}
                style={({ pressed }) => [
                  styles.addBtn,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.primary,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <Text
                  style={[
                    typography.labelLg as TextStyle,
                    styles.addText,
                    { color: colors.primary },
                  ]}
                >
                  ADD
                </Text>
              </Pressable>
            ) : (
              <View
                style={[
                  styles.stepper,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.primary,
                  },
                ]}
              >
                <Pressable
                  onPress={() => decrement(item.id)}
                  hitSlop={8}
                  style={styles.stepBtn}
                  accessibilityLabel="Decrease quantity"
                >
                  <Ionicons name="remove" size={16} color={colors.primary} />
                </Pressable>
                <Text
                  style={[
                    typography.labelLg as TextStyle,
                    styles.stepCount,
                    { color: colors.primary },
                  ]}
                >
                  {quantity}
                </Text>
                <Pressable
                  onPress={handleAdd}
                  hitSlop={8}
                  style={styles.stepBtn}
                  accessibilityLabel="Increase quantity"
                >
                  <Ionicons name="add" size={16} color={colors.primary} />
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </View>

      {showDivider ? (
        <View style={[styles.divider, { borderColor: colors.borderSubtle }]} />
      ) : null}
    </View>
  );
}

type NutritionStat = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  value: string;
};

function NutritionRow({ nutrition }: { nutrition: Nutrition }) {
  const { colors } = useTheme();

  const stats: NutritionStat[] = [
    { icon: "flame-outline", value: `${nutrition.calories} cal` },
    { icon: "barbell-outline", value: `${nutrition.protein}g protein` },
    { icon: "leaf-outline", value: `${nutrition.carbs}g carbs` },
    { icon: "water-outline", value: `${nutrition.fat}g fat` },
  ];

  return (
    <View style={styles.nutritionRow}>
      {stats.map((stat) => (
        <View
          key={stat.icon}
          style={[
            styles.nutritionChip,
            { backgroundColor: colors.surfaceContainerLow },
          ]}
        >
          <Ionicons name={stat.icon} size={12} color={colors.primary} />
          <Text
            style={[
              typography.caption as TextStyle,
              styles.nutritionText,
              { color: colors.textSecondary },
            ]}
          >
            {stat.value}
          </Text>
        </View>
      ))}
    </View>
  );
}

function VegBadge({ type }: { type: VegType }) {
  const color =
    type === "veg"
      ? lightColors.vegIndicator
      : type === "non-veg"
        ? lightColors.nonVegIndicator
        : lightColors.eggIndicator;

  return (
    <View style={[styles.vegBadge, { borderColor: color }]}>
      {type === "non-veg" ? (
        <View style={[styles.vegTriangle, { borderBottomColor: color }]} />
      ) : (
        <View style={[styles.vegDot, { backgroundColor: color }]} />
      )}
    </View>
  );
}

export default MenuItemCard;

const IMAGE_SIZE = 128;

const styles = StyleSheet.create({
  wrap: {
    paddingTop: spacing.lg,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  content: {
    flex: 1,
    paddingRight: spacing.md,
  },
  name: {
    marginTop: spacing.sm,
    fontSize: 16,
    fontWeight: "600",
  },
  desc: {
    marginTop: 4,
  },
  nutritionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  nutritionChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  nutritionText: {
    fontSize: 11,
    fontWeight: "600",
  },
  price: {
    marginTop: spacing.sm,
    fontSize: 16,
    fontWeight: "700",
  },
  imageCol: {
    width: IMAGE_SIZE,
    alignItems: "center",
    paddingBottom: 16,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: radius.lg,
  },
  actionWrap: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  addBtn: {
    minWidth: 96,
    paddingHorizontal: spacing.lg,
    height: 36,
    borderRadius: radius.md,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addText: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 96,
    height: 36,
    borderRadius: radius.md,
    borderWidth: 1.5,
    paddingHorizontal: spacing.xs,
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stepBtn: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  stepCount: {
    minWidth: 18,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
  },
  divider: {
    marginTop: spacing.lg,
    borderBottomWidth: 1,
    borderStyle: "dashed",
  },
  vegBadge: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  vegDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  vegTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 7,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
});
