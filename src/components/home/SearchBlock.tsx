import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";
import CategoriesRow from "./CategoriesRow";

type Props = {
  scrollY: SharedValue<number>;
  collapseRange: number;
};

function SearchBlock({ scrollY, collapseRange }: Props) {
  const { colors, isDarkMode } = useTheme();

  // Only animate border-radius — no layout-affecting properties, so the scroll
  // stays smooth. The radius melts away exactly as the top section finishes
  // scrolling off, so by the time this block sticks the corners are flat.
  const greenStyle = useAnimatedStyle(() => {
    const range = Math.max(collapseRange, 1);
    const r = interpolate(
      scrollY.value,
      [0, range],
      [36, 0],
      Extrapolation.CLAMP,
    );
    return {
      borderBottomLeftRadius: r,
      borderBottomRightRadius: r,
    };
  });

  return (
    <View>
      <Animated.View
        style={[
          styles.greenWrap,
          {
            backgroundColor: isDarkMode ? colors.primaryDark : colors.primary,
          },
          greenStyle,
        ]}
      >
        <Pressable
          style={[styles.searchBar, { backgroundColor: colors.surface }]}
        >
          <Ionicons
            name="search-outline"
            size={20}
            color={colors.iconSecondary}
          />
          <Text
            style={[
              typography.bodyMd as TextStyle,
              styles.searchPlaceholder,
              { color: colors.textPlaceholder },
            ]}
            numberOfLines={1}
          >
            Search menu, restaurant or craving
          </Text>
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          <Ionicons
            name="options-outline"
            size={20}
            color={colors.iconPrimary}
          />
        </Pressable>
      </Animated.View>

      <View style={{ backgroundColor: colors.background }}>
        <CategoriesRow />
      </View>
    </View>
  );
}

export default SearchBlock;

const styles = StyleSheet.create({
  greenWrap: {
    paddingTop: spacing.xs,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  searchBar: {
    height: 52,
    borderRadius: radius.full,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: spacing.md,
  },
  divider: {
    width: 1,
    height: 24,
    marginHorizontal: spacing.md,
  },
});
