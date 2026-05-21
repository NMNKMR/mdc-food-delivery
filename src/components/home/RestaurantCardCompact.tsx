import { Ionicons } from "@expo/vector-icons";
import {
  Image,
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
  width: number;
  onPress?: () => void;
};

function RestaurantCardCompact({ item, width, onPress }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, { width, backgroundColor: colors.surface }]}
    >
      <ImageBackground
        source={item.image}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.body}>
        <Text
          style={[
            typography.labelLg as TextStyle,
            { color: colors.textPrimary, fontSize: 14 },
          ]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text
          style={[
            typography.caption as TextStyle,
            styles.cuisine,
            { color: colors.textSecondary },
          ]}
          numberOfLines={1}
        >
          {item.cuisine}
        </Text>
        <View style={styles.metaRow}>
          <Ionicons name="star" size={11} color={colors.ratingStar} />
          <Text
            style={[
              typography.caption as TextStyle,
              styles.metaText,
              { color: colors.textSecondary },
            ]}
          >
            {item.rating}
          </Text>
          <Text
            style={[
              typography.caption as TextStyle,
              styles.dot,
              { color: colors.textTertiary },
            ]}
          >
            ·
          </Text>
          <Text
            style={[
              typography.caption as TextStyle,
              { color: colors.textSecondary },
            ]}
          >
            {item.deliveryTime}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default RestaurantCardCompact;

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    overflow: "hidden",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 11,
  },
  body: {
    padding: spacing.md,
  },
  cuisine: {
    marginTop: 2,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  metaText: {
    marginLeft: 4,
  },
  dot: {
    marginHorizontal: 4,
  },
});
