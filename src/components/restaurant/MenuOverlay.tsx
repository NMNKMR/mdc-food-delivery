import { useMemo } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { menu, MenuCategory } from "../../../constants/data";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";

type Props = {
  visible: boolean;
  onClose: () => void;
  categories: MenuCategory[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  hasCart: boolean;
};

const BUTTON_HEIGHT = 48;
const GAP_ABOVE_BUTTON = 12;

function MenuOverlay({
  visible,
  onClose,
  categories,
  activeCategory,
  onSelectCategory,
  hasCart,
}: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    menu.forEach((m) => {
      map[m.category] = (map[m.category] ?? 0) + 1;
    });
    return map;
  }, []);

  if (!visible) return null;

  const handlePick = (id: string) => {
    onSelectCategory(id);
    onClose();
  };

  const popoverBottom =
    insets.bottom +
    (hasCart ? 88 : 24) +
    BUTTON_HEIGHT +
    GAP_ABOVE_BUTTON;

  return (
    <>
      <Pressable
        style={[styles.backdrop, { backgroundColor: colors.scrim }]}
        onPress={onClose}
      />
      <View
        style={[
          styles.box,
          {
            right: spacing.xl,
            bottom: popoverBottom,
            backgroundColor: colors.surface,
          },
        ]}
      >
        {categories.map((cat) => {
          const isActive = cat.id === activeCategory;
          const count = counts[cat.id] ?? 0;
          const label = cat.id === "popular" ? "Popular Items" : cat.name;
          return (
            <Pressable
              key={cat.id}
              onPress={() => handlePick(cat.id)}
              style={({ pressed }) => [
                styles.row,
                pressed && !isActive && { backgroundColor: colors.pressed },
              ]}
            >
              <Text
                style={[
                  typography.labelLg as TextStyle,
                  styles.name,
                  {
                    color: isActive ? colors.primary : colors.textPrimary,
                    fontWeight: isActive ? "700" : "500",
                    fontSize: 15,
                  },
                ]}
                numberOfLines={1}
              >
                {label}
              </Text>
              <View
                style={[
                  styles.countChip,
                  {
                    backgroundColor: isActive
                      ? colors.primary
                      : colors.surfaceContainer,
                  },
                ]}
              >
                <Text
                  style={[
                    typography.labelMd as TextStyle,
                    {
                      color: isActive
                        ? colors.onPrimary
                        : colors.textSecondary,
                      fontSize: 12,
                    },
                  ]}
                >
                  {count}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </>
  );
}

export default MenuOverlay;

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  box: {
    position: "absolute",
    minWidth: 220,
    maxWidth: 280,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.lg,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
  },
  name: {
    flex: 1,
    marginRight: spacing.md,
  },
  countChip: {
    minWidth: 28,
    height: 22,
    paddingHorizontal: spacing.sm,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
});
