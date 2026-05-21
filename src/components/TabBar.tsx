import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, StyleSheet, Text, TextStyle, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { radius, spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";
import { useTheme } from "../../context/theme";
import { AppStackParamList, AppTabsParamList } from "../navigation/types";
import Avatar from "./shared/Avatar";

type TabIconName = React.ComponentProps<typeof Ionicons>["name"];

const iconFor = (
  route: keyof AppTabsParamList,
  focused: boolean,
): TabIconName => {
  switch (route) {
    case "Home":
      return focused ? "home" : "home-outline";
    case "Search":
      return focused ? "search" : "search-outline";
    case "Orders":
      return focused ? "receipt" : "receipt-outline";
  }
};

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const stack =
    navigation.getParent<NativeStackNavigationProp<AppStackParamList>>();

  return (
    <View
      style={[
        styles.wrap,
        {
          paddingBottom: insets.bottom + spacing.sm,
        },
      ]}
    >
      <View
        style={[
          styles.bar,
          {
            backgroundColor: colors.surface,
            shadowColor: "#000",
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const { options } = descriptors[route.key];
          const label =
            typeof options.tabBarLabel === "string"
              ? options.tabBarLabel
              : route.name;
          const badge = options.tabBarBadge;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              style={[
                styles.item,
                focused && {
                  backgroundColor: colors.primary,
                  paddingHorizontal: spacing.lg,
                },
              ]}
            >
              <View>
                <Ionicons
                  name={iconFor(route.name as keyof AppTabsParamList, focused)}
                  size={22}
                  color={focused ? colors.onPrimary : colors.tabBarInactive}
                />
                {badge != null && badge !== 0 ? (
                  <View
                    style={[
                      styles.badge,
                      { backgroundColor: colors.badge },
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgeText,
                        { color: colors.badgeText },
                      ]}
                    >
                      {badge}
                    </Text>
                  </View>
                ) : null}
              </View>
              {focused ? (
                <Text
                  style={[
                    typography.labelLg as TextStyle,
                    {
                      color: colors.onPrimary,
                      marginLeft: spacing.sm,
                    },
                  ]}
                >
                  {label}
                </Text>
              ) : null}
            </Pressable>
          );
        })}

        <View style={[styles.divider, { backgroundColor: colors.divider }]} />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open profile"
          onPress={() => stack?.navigate("ProfileArea")}
          style={styles.item}
        >
          <Avatar size={36} />
        </Pressable>
      </View>
    </View>
  );
}

export default CustomTabBar;

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: radius.full,
    height: 60,
    paddingHorizontal: spacing.sm,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  item: {
    height: 44,
    minWidth: 44,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 36,
    width: 1,
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -10,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 14,
  },
});
