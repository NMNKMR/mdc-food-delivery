import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TextStyle, View } from "react-native";
import { Restaurant } from "../../../constants/data";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";

type Props = {
  restaurant: Restaurant;
};

function InfoCard({ restaurant }: Props) {
  const { colors } = useTheme();

  const tags = [
    ...restaurant.cuisine
      .split(/[·•]/)
      .map((s) => s.trim())
      .filter(Boolean),
  ];

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={styles.titleRow}>
        <Text
          style={[
            typography.headlineSm as TextStyle,
            styles.name,
            { color: colors.textPrimary, fontSize: 22 },
          ]}
          numberOfLines={1}
        >
          {restaurant.name}
        </Text>
        <View
          style={[
            styles.ratingChip,
            { backgroundColor: colors.successContainer },
          ]}
        >
          <Ionicons name="star" size={12} color={colors.ratingStar} />
          <Text
            style={[
              typography.labelMd as TextStyle,
              { color: colors.onSuccessContainer, marginLeft: 4 },
            ]}
          >
            {restaurant.rating}
          </Text>
        </View>
      </View>

      <View style={styles.tagRow}>
        {tags.map((tag) => (
          <View
            key={tag}
            style={[styles.tag, { backgroundColor: colors.surfaceContainer }]}
          >
            <Text
              style={[
                typography.caption as TextStyle,
                { color: colors.textSecondary },
              ]}
            >
              {tag}
            </Text>
          </View>
        ))}
      </View>

      <View style={[styles.divider, { backgroundColor: colors.divider }]} />

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={16} color={colors.iconSecondary} />
          <Text
            style={[
              typography.bodyMd as TextStyle,
              styles.metaText,
              { color: colors.textPrimary },
            ]}
          >
            {restaurant.deliveryTime}
          </Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons
            name="bicycle-outline"
            size={16}
            color={colors.iconSecondary}
          />
          <Text
            style={[
              typography.bodyMd as TextStyle,
              styles.metaText,
              { color: colors.textPrimary },
            ]}
          >
            Free Delivery
          </Text>
        </View>
      </View>
    </View>
  );
}

export default InfoCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.xl,
    marginTop: -spacing.xxl,
    marginBottom: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.xl,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  name: {
    flex: 1,
    marginRight: spacing.md,
  },
  ratingChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  tag: {
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  divider: {
    height: 1,
    marginVertical: spacing.md,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xl,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    marginLeft: 6,
  },
});
