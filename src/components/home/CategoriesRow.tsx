import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";
import { categories } from "../../../constants/data";

function CategoriesRow() {
  const { colors } = useTheme();
  const [active, setActive] = useState("all");

  return (
    <View style={[styles.wrap, { backgroundColor: colors.background }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {categories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <Pressable
              key={cat.id}
              onPress={() => setActive(cat.id)}
              style={[
                styles.chip,
                {
                  backgroundColor: isActive
                    ? colors.primary
                    : colors.surfaceContainer,
                },
              ]}
            >
              {cat.icon ? (
                <Ionicons
                  name={cat.icon}
                  size={14}
                  color={isActive ? colors.onPrimary : colors.primary}
                  style={styles.icon}
                />
              ) : null}
              <Text
                style={[
                  typography.labelLg as TextStyle,
                  {
                    color: isActive ? colors.onPrimary : colors.textPrimary,
                  },
                ]}
              >
                {cat.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default CategoriesRow;

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: spacing.sm,
  },
  content: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
  icon: {
    marginRight: 6,
  },
});
