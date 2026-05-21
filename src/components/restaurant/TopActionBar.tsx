import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";

const AnimatedLinearGradient =
  Animated.createAnimatedComponent(LinearGradient);

// Bar bg cross-fades over this scroll range. Tuned to roughly the hero
// height minus the bar height so the surface bg lands as the hero leaves.
const FADE_START = 180;
const FADE_END = 240;

type Props = {
  scrollY: SharedValue<number>;
  scrolledPast: boolean;
  currentSectionTitle?: string;
  onBack: () => void;
  searchOpen: boolean;
  onOpenSearch: () => void;
  onCloseSearch: () => void;
  query: string;
  setQuery: (q: string) => void;
};

function TopActionBar({
  scrollY,
  scrolledPast,
  currentSectionTitle,
  onBack,
  searchOpen,
  onOpenSearch,
  onCloseSearch,
  query,
  setQuery,
}: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  // Mirror searchOpen into a shared value so the bg worklets can read it.
  const searchOpenSV = useSharedValue(searchOpen);
  useEffect(() => {
    searchOpenSV.value = searchOpen;
  }, [searchOpen, searchOpenSV]);

  const surfaceBgStyle = useAnimatedStyle(() => {
    const opacity = searchOpenSV.value
      ? 1
      : interpolate(
          scrollY.value,
          [FADE_START, FADE_END],
          [0, 1],
          Extrapolation.CLAMP,
        );
    return { opacity };
  });

  const gradientStyle = useAnimatedStyle(() => {
    const opacity = searchOpenSV.value
      ? 0
      : interpolate(
          scrollY.value,
          [FADE_START, FADE_END],
          [1, 0],
          Extrapolation.CLAMP,
        );
    return { opacity };
  });

  const useThemedTint = scrolledPast || searchOpen;
  const iconColor = useThemedTint ? colors.iconPrimary : "#FFFFFF";

  return (
    <View style={[styles.wrap, { paddingTop: insets.top }]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: colors.surface },
          surfaceBgStyle,
        ]}
      />

      <AnimatedLinearGradient
        colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.2)", "rgba(0,0,0,0)"]}
        style={[StyleSheet.absoluteFill, gradientStyle]}
      />

      <View style={styles.row}>
        <Pressable
          onPress={onBack}
          hitSlop={6}
          style={styles.iconBtn}
          accessibilityLabel="Go back"
        >
          <Ionicons name="chevron-back" size={24} color={iconColor} />
        </Pressable>

        {searchOpen ? (
          <View
            style={[
              styles.inputWrap,
              { backgroundColor: colors.surfaceContainer },
            ]}
          >
            <Ionicons
              name="search-outline"
              size={18}
              color={colors.iconSecondary}
            />
            <TextInput
              style={[
                styles.input,
                typography.bodyMd as TextStyle,
                { color: colors.textPrimary },
              ]}
              placeholder="Search menu"
              placeholderTextColor={colors.textPlaceholder}
              value={query}
              onChangeText={setQuery}
              autoFocus
              returnKeyType="search"
            />
            <Pressable
              onPress={onCloseSearch}
              hitSlop={6}
              accessibilityLabel="Close search"
            >
              <Ionicons name="close" size={20} color={colors.iconPrimary} />
            </Pressable>
          </View>
        ) : (
          <>
            {currentSectionTitle ? (
              <Text
                style={[styles.sectionTitle, { color: iconColor }]}
                numberOfLines={1}
              >
                {currentSectionTitle}
              </Text>
            ) : (
              <View style={styles.spacer} />
            )}

            <View style={styles.rightIcons}>
              <Pressable
                onPress={onOpenSearch}
                hitSlop={6}
                style={styles.iconBtn}
                accessibilityLabel="Search"
              >
                <Ionicons
                  name="search-outline"
                  size={22}
                  color={iconColor}
                />
              </Pressable>
              <Pressable
                hitSlop={6}
                style={styles.iconBtn}
                accessibilityLabel="Favorite"
              >
                <Ionicons
                  name="heart-outline"
                  size={22}
                  color={iconColor}
                />
              </Pressable>
              <Pressable
                hitSlop={6}
                style={styles.iconBtn}
                accessibilityLabel="More"
              >
                <Ionicons
                  name="ellipsis-vertical"
                  size={20}
                  color={iconColor}
                />
              </Pressable>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

export default TopActionBar;

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    minHeight: 56,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    flex: 1,
  },
  sectionTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    paddingHorizontal: spacing.md,
  },
  rightIcons: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  inputWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    gap: spacing.sm,
    height: 42,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
  },
});
