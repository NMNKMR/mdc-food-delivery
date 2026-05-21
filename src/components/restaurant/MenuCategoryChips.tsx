import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { MenuCategory } from "../../../constants/data";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";

type Props = {
  categories: MenuCategory[];
  activeId: string;
  onSelect: (id: string) => void;
};

function MenuCategoryChips({ categories, activeId, onSelect }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.wrap, { backgroundColor: colors.background }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {categories.map((cat) => {
          const isActive = activeId === cat.id;
          return (
            <Pressable
              key={cat.id}
              onPress={() => onSelect(cat.id)}
              style={[
                styles.chip,
                {
                  backgroundColor: isActive
                    ? colors.primary
                    : colors.surfaceContainer,
                },
              ]}
            >
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

export default MenuCategoryChips;

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: spacing.md,
  },
  content: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.full,
  },
});
