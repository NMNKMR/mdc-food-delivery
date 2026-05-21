import { Ionicons } from "@expo/vector-icons";
import { CompositeScreenProps } from "@react-navigation/native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import Avatar from "../../components/shared/Avatar";
import ThemeToggle from "../../components/shared/ThemeToggle";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";
import { useAuthStore } from "../../../store/authStore";
import {
  AppStackParamList,
  ProfileDrawerParamList,
} from "../../navigation/types";

type Props = CompositeScreenProps<
  DrawerScreenProps<ProfileDrawerParamList, "ProfileMain">,
  NativeStackScreenProps<AppStackParamList>
>;

type IconName = React.ComponentProps<typeof Ionicons>["name"];

type QuickAction = {
  icon: IconName;
  label: string;
  onPress?: () => void;
};

function ProfileScreen(_: Props) {
  const { colors } = useTheme();
  const user = useAuthStore((s) => s.user);

  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Guest user";
  const phone = user?.phone;

  const quickActions: QuickAction[] = [
    { icon: "location-outline", label: "Saved Address" },
    { icon: "card-outline", label: "Payment Methods" },
    { icon: "notifications-outline", label: "Notifications" },
    { icon: "pricetags-outline", label: "Promotions" },
  ];

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.profileCard, { backgroundColor: colors.surface }]}>
          <View style={styles.cardTop}>
            <Avatar size={72} />
            <View style={styles.identity}>
              <Text
                style={[
                  typography.headlineSm as TextStyle,
                  { color: colors.textPrimary },
                ]}
                numberOfLines={1}
              >
                {fullName}
              </Text>
              <Text
                style={[
                  typography.bodyMd as TextStyle,
                  styles.phone,
                  { color: colors.textSecondary },
                ]}
              >
                {phone ? `+91 ${phone}` : "Add your phone"}
              </Text>
              <Pressable style={styles.editRow} hitSlop={6}>
                <Text
                  style={[
                    typography.labelLg as TextStyle,
                    { color: colors.primary },
                  ]}
                >
                  Edit profile
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={14}
                  color={colors.primary}
                />
              </Pressable>
            </View>
          </View>

          <View
            style={[styles.cardDivider, { backgroundColor: colors.divider }]}
          />

          <View style={styles.membershipRow}>
            <View
              style={[
                styles.membershipIcon,
                { backgroundColor: colors.primaryMuted },
              ]}
            >
              <Ionicons name="leaf" size={18} color={colors.primary} />
            </View>
            <View style={styles.membershipText}>
              <Text
                style={[
                  typography.labelLg as TextStyle,
                  { color: colors.textPrimary, fontSize: 15 },
                ]}
              >
                Greens Club
              </Text>
              <Text
                style={[
                  typography.caption as TextStyle,
                  styles.membershipSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                Become a member
              </Text>
            </View>
            <Pressable
              style={[styles.detailsBtn, { borderColor: colors.primary }]}
              hitSlop={6}
            >
              <Text
                style={[
                  typography.labelMd as TextStyle,
                  { color: colors.primary, marginRight: 2 },
                ]}
              >
                Details
              </Text>
              <Ionicons
                name="chevron-forward"
                size={12}
                color={colors.primary}
              />
            </Pressable>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          {quickActions.map((action) => (
            <View key={action.label}>
              <Pressable
                onPress={action.onPress}
                style={({ pressed }) => [
                  styles.actionRow,
                  pressed && { backgroundColor: colors.pressed },
                ]}
              >
                <View style={styles.actionIcon}>
                  <Ionicons
                    name={action.icon}
                    size={24}
                    color={colors.primary}
                  />
                </View>
                <Text
                  style={[
                    typography.bodyLg as TextStyle,
                    styles.actionLabel,
                    { color: colors.textPrimary },
                  ]}
                >
                  {action.label}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={colors.iconSecondary}
                />
              </Pressable>
              <View
                style={[
                  styles.actionDivider,
                  { backgroundColor: colors.divider },
                ]}
              />
            </View>
          ))}

          <View style={styles.actionRow}>
            <View style={styles.actionIcon}>
              <Ionicons
                name="color-palette-outline"
                size={24}
                color={colors.primary}
              />
            </View>
            <Text
              style={[
                typography.bodyLg as TextStyle,
                styles.actionLabel,
                { color: colors.textPrimary },
              ]}
            >
              Theme
            </Text>
            <ThemeToggle />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  profileCard: {
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  identity: {
    flex: 1,
    marginLeft: spacing.lg,
  },
  phone: {
    marginTop: 2,
  },
  editRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  cardDivider: {
    height: 1,
    marginVertical: spacing.lg,
  },
  membershipRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  membershipIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  membershipText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  membershipSubtitle: {
    marginTop: 2,
  },
  detailsBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
  },
  card: {
    borderRadius: radius.xl,
    overflow: "hidden",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  actionIcon: {
    marginRight: spacing.lg,
  },
  actionLabel: {
    flex: 1,
  },
  actionDivider: {
    height: 1,
  },
});
