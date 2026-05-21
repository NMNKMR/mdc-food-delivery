import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";
import { useTheme } from "../../context/theme";
import { useAuthStore } from "../../store/authStore";
import Avatar from "../components/shared/Avatar";

function DrawerContent(props: DrawerContentComponentProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Guest user";
  const phone = user?.phone;

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: colors.surfaceContainerLow,
          paddingBottom: insets.bottom + spacing.lg,
        },
      ]}
    >
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          paddingTop: insets.top + spacing.lg,
          paddingHorizontal: spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Avatar size={72} style={{ marginBottom: spacing.lg }} />
          <Text
            style={[
              typography.headlineSm as TextStyle,
              styles.name,
              { color: colors.textPrimary },
            ]}
            numberOfLines={1}
          >
            {fullName}
          </Text>
          <View style={styles.emailRow}>
            <Text
              style={[
                typography.bodyMd as TextStyle,
                { color: colors.textSecondary, flex: 1 },
              ]}
              numberOfLines={1}
            >
              {"+91 " + phone || ""}
            </Text>
            <Pressable
              style={{ flexDirection: "row", alignItems: "center" }}
              hitSlop={8}
            >
              <Text
                style={[
                  typography.labelLg as TextStyle,
                  { color: colors.primary },
                ]}
              >
                Edit Profile
              </Text>
              <Ionicons
                name="chevron-forward"
                size={14}
                color={colors.primary}
              />
            </Pressable>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.divider }]} />

        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View
        style={[styles.bottomDivider, { backgroundColor: colors.divider }]}
      />

      <View style={styles.logoutWrap}>
        <Pressable
          onPress={logout}
          style={({ pressed }) => [
            styles.logoutChip,
            { backgroundColor: colors.errorContainer },
            pressed && { opacity: 0.7 },
          ]}
        >
          <Ionicons
            name="log-out-outline"
            size={20}
            color={colors.textError}
          />
          <Text
            style={[
              typography.labelLg as TextStyle,
              {
                color: colors.textError,
                marginLeft: spacing.sm,
                fontSize: 16,
              },
            ]}
          >
            Logout
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default DrawerContent;

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    paddingTop: spacing.sm,
    paddingLeft: spacing.md
  },
  name: {
    marginBottom: spacing.xs,
  },
  emailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    height: 1,
    marginVertical: spacing.lg,
  },
  bottomDivider: {
    height: 1,
    marginHorizontal: spacing.xl,
  },
  logoutWrap: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  logoutChip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
    borderRadius: 999,
  },
});
