import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ImageSourcePropType,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";
import FloatingHero from "./SlidingHero";

function TopSection() {
  const { colors, isDarkMode } = useTheme();

  return (
    <View
      style={[
        styles.wrap,
        {
          backgroundColor: isDarkMode ? colors.primaryDark : colors.primary,
        },
      ]}
    >
      <View style={styles.topRow}>
        <Pressable style={styles.location} hitSlop={6}>
          <View style={styles.locationLabel}>
            <Text
              style={[
                typography.caption as TextStyle,
                { color: colors.white, opacity: 0.85 },
              ]}
            >
              Delivery location (Home)
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

      <View style={styles.headingRow}>
        <Text
          style={[
            typography.headlineLg as TextStyle,
            styles.heading,
            { color: colors.white },
          ]}
        >
          Find your next{"\n"}healthy meal !
        </Text>
        <FloatingHero />
      </View>
    </View>
  );
}
export default TopSection;

const styles = StyleSheet.create({
  wrap: {
    paddingTop: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
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
  headingRow: {
    marginTop: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
  },
  heading: {
    flex: 1,
    paddingRight: spacing.sm,
  },
});
