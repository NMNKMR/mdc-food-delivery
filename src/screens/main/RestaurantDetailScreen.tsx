import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { setStatusBarStyle } from "expo-status-bar";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewToken,
} from "react-native";
import Animated, {
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  featured,
  menu,
  menuCategories,
  MenuItem,
  topRated,
} from "../../../constants/data";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";
import {
  useCartCount,
  useCartTotal,
} from "../../../store/cartStore";
import FloatingMenuButton from "../../components/restaurant/FloatingMenuButton";
import HeroBlock from "../../components/restaurant/HeroBlock";
import InfoCard from "../../components/restaurant/InfoCard";
import MenuItemCard from "../../components/restaurant/MenuItemCard";
import MenuOverlay from "../../components/restaurant/MenuOverlay";
import TopActionBar from "../../components/restaurant/TopActionBar";
import ViewCartBar from "../../components/restaurant/ViewCartBar";
import { AppStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AppStackParamList, "RestaurantDetail">;

type DetailListItem =
  | { type: "hero" }
  | { type: "info" }
  | { type: "categoryDivider" }
  | { type: "sectionTitle"; title: string; categoryId: string }
  | { type: "menuItem"; item: MenuItem; isLastInCategory: boolean };

// Threshold at which the hero is considered "out of view" — bar bg + status
// bar style switch over this point. Tuned to roughly hero height (280) minus
// the bar's content height (~56) so the swap lands as the hero passes by.
const SCROLL_THRESHOLD = 220;

function RestaurantDetailScreen({ route, navigation }: Props) {
  const { colors, isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();
  const { restaurantId } = route.params;
  const cartCount = useCartCount();
  const cartTotal = useCartTotal();

  const listRef = useRef<FlatList<DetailListItem>>(null);
  const scrollY = useSharedValue(0);
  const [scrolledPast, setScrolledPast] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(
    menuCategories[0].id,
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);

  const restaurant = useMemo(
    () =>
      [...topRated, ...featured].find((r) => r.id === restaurantId) ??
      topRated[0],
    [restaurantId],
  );

  const filteredMenu = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return menu;
    return menu.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q),
    );
  }, [query]);

  const items: DetailListItem[] = useMemo(() => {
    const list: DetailListItem[] = [
      { type: "hero" },
      { type: "info" },
    ];
    let firstAdded = false;
    menuCategories.forEach((cat) => {
      const catItems = filteredMenu.filter((m) => m.category === cat.id);
      if (catItems.length === 0) return;
      if (firstAdded) list.push({ type: "categoryDivider" });
      firstAdded = true;
      list.push({
        type: "sectionTitle",
        title: cat.id === "popular" ? "Popular Items" : cat.name,
        categoryId: cat.id,
      });
      catItems.forEach((item, idx) =>
        list.push({
          type: "menuItem",
          item,
          isLastInCategory: idx === catItems.length - 1,
        }),
      );
    });
    return list;
  }, [filteredMenu]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  // Cross the threshold once, push a boolean to JS — avoids running runOnJS
  // on every scroll frame.
  useAnimatedReaction(
    () => scrollY.value > SCROLL_THRESHOLD,
    (current, previous) => {
      if (current !== previous) {
        runOnJS(setScrolledPast)(current);
      }
    },
  );

  // Status bar: light while the hero (and dark gradient) own the top of the
  // screen, themed once the bar's surface bg takes over.
  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle(
        scrolledPast ? (isDarkMode ? "light" : "dark") : "light",
      );
      return () => {
        setStatusBarStyle(isDarkMode ? "light" : "dark");
      };
    }, [scrolledPast, isDarkMode]),
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 30,
  }).current;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const sorted = viewableItems
        .filter((v) => v.isViewable)
        .sort((a, b) => (a.index ?? 0) - (b.index ?? 0));

      const top = sorted.find((v) => {
        const item = v.item as DetailListItem;
        return item.type === "menuItem" || item.type === "sectionTitle";
      });

      if (!top) return;
      const item = top.item as DetailListItem;
      const catId =
        item.type === "sectionTitle"
          ? item.categoryId
          : item.type === "menuItem"
            ? item.item.category
            : null;
      if (catId) setCurrentCategoryId(catId);
    },
  ).current;

  const scrollToCategory = (categoryId: string) => {
    const index = items.findIndex(
      (i) => i.type === "sectionTitle" && i.categoryId === categoryId,
    );
    if (index >= 0) {
      listRef.current?.scrollToIndex({
        index,
        animated: true,
        viewOffset: insets.top + 56,
      });
    }
  };

  const keyExtractor = (item: DetailListItem, index: number) => {
    if (item.type === "menuItem") return item.item.id;
    if (item.type === "sectionTitle") return `section-${item.categoryId}`;
    if (item.type === "categoryDivider") return `divider-${index}`;
    return item.type;
  };

  const renderItem: ListRenderItem<DetailListItem> = ({ item }) => {
    switch (item.type) {
      case "hero":
        return <HeroBlock restaurant={restaurant} />;
      case "info":
        return <InfoCard restaurant={restaurant} />;
      case "categoryDivider":
        return (
          <View
            style={[
              styles.categoryDivider,
              { backgroundColor: colors.surfaceContainerHigh },
            ]}
          />
        );
      case "sectionTitle":
        return (
          <Text
            style={[
              typography.headlineSm as TextStyle,
              styles.sectionTitle,
              { color: colors.textPrimary },
            ]}
          >
            {item.title}
          </Text>
        );
      case "menuItem":
        return (
          <View style={styles.menuItemWrap}>
            <MenuItemCard
              item={item.item}
              showDivider={!item.isLastInCategory}
            />
          </View>
        );
    }
  };

  const currentSectionTitle =
    scrolledPast && !searchOpen
      ? (() => {
          const cat = menuCategories.find((c) => c.id === currentCategoryId);
          if (!cat) return undefined;
          return cat.id === "popular" ? "Popular Items" : cat.name;
        })()
      : undefined;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Animated.FlatList<DetailListItem>
        ref={listRef as never}
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        contentContainerStyle={{
          paddingBottom: insets.bottom + (cartCount > 0 ? 100 : 24),
        }}
        onScrollToIndexFailed={(info) => {
          setTimeout(() => {
            listRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
              viewOffset: insets.top + 56,
            });
          }, 80);
        }}
      />

      <TopActionBar
        scrollY={scrollY}
        scrolledPast={scrolledPast}
        currentSectionTitle={currentSectionTitle}
        onBack={() => navigation.goBack()}
        searchOpen={searchOpen}
        onOpenSearch={() => setSearchOpen(true)}
        onCloseSearch={() => {
          setSearchOpen(false);
          setQuery("");
        }}
        query={query}
        setQuery={setQuery}
      />

      <MenuOverlay
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        categories={menuCategories}
        activeCategory={currentCategoryId}
        onSelectCategory={scrollToCategory}
        hasCart={cartCount > 0}
      />

      <FloatingMenuButton
        open={menuVisible}
        onPress={() => setMenuVisible((v) => !v)}
        hasCart={cartCount > 0}
      />

      {cartCount > 0 ? (
        <ViewCartBar
          count={cartCount}
          total={cartTotal}
          onPress={() => navigation.navigate("Cart")}
        />
      ) : null}
    </View>
  );
}

export default RestaurantDetailScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  sectionTitle: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    fontSize: 20,
    fontWeight: "700",
  },
  menuItemWrap: {
    paddingHorizontal: spacing.xl,
  },
  categoryDivider: {
    height: 8,
    marginTop: spacing.xl,
  },
});
