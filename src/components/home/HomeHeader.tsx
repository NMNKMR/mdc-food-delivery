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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";

type Props = {
  scrollY: SharedValue<number>;
};

const HEADER_EXPANDED = 230;
const HEADER_COLLAPSED_BASE = 80; // search bar + paddings (insets.top added on top)

function HomeHeader({ scrollY }: Props) {
  const { colors, isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();

  const expanded = HEADER_EXPANDED + insets.top;
  const collapsed = HEADER_COLLAPSED_BASE + insets.top;
  const distance = expanded - collapsed;

  const headerStyle = useAnimatedStyle(() => {
    const p = interpolate(
      scrollY.value,
      [0, distance],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {
      height: interpolate(p, [0, 1], [expanded, collapsed]),
      borderBottomLeftRadius: interpolate(p, [0, 1], [36, 0]),
      borderBottomRightRadius: interpolate(p, [0, 1], [36, 0]),
    };
  });

  const topContentStyle = useAnimatedStyle(() => {
    const p = interpolate(
      scrollY.value,
      [0, distance * 0.6],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity: 1 - p,
      transform: [{ translateY: interpolate(p, [0, 1], [0, -24]) }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          backgroundColor: isDarkMode ? colors.primaryDark : colors.primary,
          paddingTop: insets.top + spacing.md,
        },
        headerStyle,
      ]}
    >
      <Animated.View style={[styles.topContent, topContentStyle]}>
        <View style={styles.topRow}>
          <Pressable style={styles.location} hitSlop={6}>
            <View style={styles.locationLabel}>
              <Text
                style={[
                  typography.caption as TextStyle,
                  { color: colors.white, opacity: 0.85 },
                ]}
              >
                Delivery location
              </Text>
              <Ionicons
                name="chevron-down"
                size={12}
                color={colors.white}
                style={styles.chevron}
              />
            </View>
            <Text
              style={[
                typography.labelLg as TextStyle,
                styles.locationValue,
                { color: colors.white },
              ]}
              numberOfLines={1}
            >
              Goel Niwas, Gurugram, 122001
            </Text>
          </Pressable>

          <Pressable
            style={[styles.bellBtn, { backgroundColor: colors.surface }]}
            accessibilityLabel="Notifications"
            hitSlop={6}
          >
            <Ionicons
              name="notifications-outline"
              size={22}
              color={colors.iconPrimary}
            />
          </Pressable>
        </View>

        <Text
          style={[
            typography.headlineLg as TextStyle,
            styles.heading,
            { color: colors.white },
          ]}
        >
          What you'd like{"\n"}to eat for today?
        </Text>
      </Animated.View>

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
  );
}

export default HomeHeader;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.xl,
    overflow: "hidden",
    justifyContent: "flex-end",
    paddingBottom: spacing.md,
  },
  topContent: {
    flex: 1,
    justifyContent: "flex-start",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  location: {
    flex: 1,
    paddingRight: spacing.md,
  },
  locationLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  chevron: {
    marginLeft: 4,
  },
  locationValue: {
    marginTop: 2,
  },
  bellBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    marginTop: spacing.lg,
  },
  searchBar: {
    height: 52,
    borderRadius: radius.full,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
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
