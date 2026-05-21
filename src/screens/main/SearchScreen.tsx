import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { categories } from "../../../constants/data";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";

const POPULAR_SEARCHES = [
  "Healthy Salads",
  "Midnight Snacks",
  "Sushi Platter",
  "Boba Tea",
  "Local Favorites",
];

export function SearchScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const [query, setQuery] = useState("");

  useFocusEffect(
    useCallback(() => {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => {
        clearTimeout(t);
        inputRef.current?.blur();
      };
    }, []),
  );

  const browseCategories = useMemo(
    () => categories.filter((c) => c.id !== "all"),
    [],
  );

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top + spacing.sm,
        },
      ]}
    >
      <View style={styles.searchWrap}>
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: colors.surface,
              borderColor: colors.borderSubtle,
            },
          ]}
        >
          <Ionicons
            name="search-outline"
            size={20}
            color={colors.iconSecondary}
          />
          <TextInput
            ref={inputRef}
            value={query}
            onChangeText={setQuery}
            placeholder="Dishes, restaurants, or cuisines"
            placeholderTextColor={colors.textPlaceholder}
            style={[styles.searchInput, { color: colors.textPrimary }]}
            returnKeyType="search"
          />
          {query.length > 0 ? (
            <Pressable onPress={() => setQuery("")} hitSlop={6}>
              <Ionicons
                name="close-circle"
                size={18}
                color={colors.iconSecondary}
              />
            </Pressable>
          ) : null}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + 120,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.section}>
          <Text
            style={[
              typography.headlineSm as TextStyle,
              styles.sectionTitle,
              { color: colors.textPrimary },
            ]}
          >
            Popular Searches
          </Text>
          <View style={styles.chipsWrap}>
            {POPULAR_SEARCHES.map((label) => (
              <Pressable
                key={label}
                onPress={() => setQuery(label)}
                style={({ pressed }) => [
                  styles.chip,
                  {
                    backgroundColor: colors.surfaceContainer,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <Text
                  style={[
                    typography.labelLg as TextStyle,
                    { color: colors.textPrimary },
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text
            style={[
              typography.headlineSm as TextStyle,
              styles.sectionTitle,
              { color: colors.textPrimary },
            ]}
          >
            Browse Categories
          </Text>
          <View style={styles.grid}>
            {browseCategories.map((cat) => (
              <Pressable
                key={cat.id}
                onPress={() => setQuery(cat.name)}
                style={({ pressed }) => [
                  styles.categoryCard,
                  {
                    backgroundColor: colors.surface,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.categoryIconWrap,
                    { backgroundColor: colors.primaryMuted },
                  ]}
                >
                  {cat.icon ? (
                    <Ionicons
                      name={cat.icon}
                      size={26}
                      color={colors.primary}
                    />
                  ) : null}
                </View>
                <Text
                  style={[
                    typography.labelLg as TextStyle,
                    styles.categoryLabel,
                    { color: colors.textPrimary },
                  ]}
                  numberOfLines={1}
                >
                  {cat.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  searchWrap: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  searchBar: {
    height: 52,
    borderRadius: radius.full,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: 15,
    padding: 0,
  },
  section: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    fontSize: 18,
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  categoryCard: {
    flexBasis: "48%",
    flexGrow: 1,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    alignItems: "flex-start",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  categoryIconWrap: {
    width: 52,
    height: 52,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  categoryLabel: {
    fontSize: 15,
  },
});
