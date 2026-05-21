import { Ionicons } from "@expo/vector-icons";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";
import { Restaurant } from "../../../constants/data";

type Props = {
  item: Restaurant;
};

function RestaurantCardFeatured({ item }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable style={[styles.card, { backgroundColor: colors.surface }]}>
      <View>
        <ImageBackground
          source={item.image}
          style={styles.image}
          resizeMode="cover"
        />
        {item.tags?.[0] ? (
          <View style={[styles.tag, { backgroundColor: colors.tagNewBg }]}>
            <Text
              style={[
                typography.labelMd as TextStyle,
                { color: colors.tagNew },
              ]}
            >
              {item.tags[0]}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text
            style={[
              typography.headlineSm as TextStyle,
              styles.name,
              { color: colors.textPrimary, fontSize: 18 },
            ]}
            numberOfLines={1}
          >
            {item.name}
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
                styles.ratingText,
                { color: colors.onSuccessContainer },
              ]}
            >
              {item.rating}
            </Text>
          </View>
        </View>

        <Text
          style={[
            typography.bodyMd as TextStyle,
            styles.cuisine,
            { color: colors.textSecondary },
          ]}
          numberOfLines={1}
        >
          {item.cuisine}
        </Text>

        <View style={styles.metaRow}>
          <Ionicons
            name="bicycle-outline"
            size={14}
            color={colors.iconSecondary}
          />
          <Text
            style={[
              typography.caption as TextStyle,
              styles.metaText,
              { color: colors.textSecondary },
            ]}
          >
            {item.deliveryTime}
          </Text>
          <View
            style={[styles.dot, { backgroundColor: colors.textTertiary }]}
          />
          <Ionicons
            name="location-outline"
            size={14}
            color={colors.iconSecondary}
          />
          <Text
            style={[
              typography.caption as TextStyle,
              styles.metaText,
              { color: colors.textSecondary },
            ]}
          >
            {item.distance}
          </Text>
          <View
            style={[styles.dot, { backgroundColor: colors.textTertiary }]}
          />
          <Text
            style={[
              typography.caption as TextStyle,
              { color: colors.textSecondary },
            ]}
          >
            {item.reviews.toLocaleString()} reviews
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default RestaurantCardFeatured;

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    overflow: "hidden",
    marginBottom: spacing.lg,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 10,
  },
  tag: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  body: {
    padding: spacing.lg,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    flex: 1,
    marginRight: spacing.md,
  },
  ratingChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  ratingText: {
    marginLeft: 4,
  },
  cuisine: {
    marginTop: 2,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.sm,
  },
  metaText: {
    marginLeft: 4,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    marginHorizontal: spacing.sm,
  },
});
