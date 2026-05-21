import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";
import { featured, topRated, Restaurant } from "../../../constants/data";
import RestaurantCardCompact from "../../components/home/RestaurantCardCompact";
import RestaurantCardFeatured from "../../components/home/RestaurantCardFeatured";
import SearchBlock from "../../components/home/SearchBlock";
import TopSection from "../../components/home/TopSection";
import { useStatusBarStyle } from "../../hooks/useStatusBarStyle";
import { AppStackParamList } from "../../navigation/types";

const FADE_HEIGHT = 80;

const SCREEN_WIDTH = Dimensions.get("window").width;
const COMPACT_CARD_WIDTH =
  (SCREEN_WIDTH - spacing.xl * 2 - spacing.md - 32) / 2;

type HomeListItem =
  | { type: "top" }
  | { type: "searchAndCategories" }
  | { type: "topRated" }
  | { type: "featuredTitle" }
  | { type: "featuredItem"; item: Restaurant };

function HomeScreen() {
  useStatusBarStyle("light");
  const { colors, isDarkMode } = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const scrollY = useSharedValue(0);
  const [topHeight, setTopHeight] = useState(0);

  const headerGreen = isDarkMode ? colors.primaryDark : colors.primary;

  const openRestaurant = (id: string) =>
    navigation.navigate("RestaurantDetail", { restaurantId: id });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const topRatedPairs = useMemo(() => {
    const pairs: [Restaurant, Restaurant?][] = [];
    for (let i = 0; i < topRated.length; i += 2) {
      pairs.push([topRated[i], topRated[i + 1]]);
    }
    return pairs;
  }, []);

  const items: HomeListItem[] = useMemo(
    () => [
      { type: "top" },
      { type: "searchAndCategories" },
      { type: "topRated" },
      { type: "featuredTitle" },
      ...featured.map((item) => ({ type: "featuredItem" as const, item })),
    ],
    [],
  );

  const keyExtractor = (item: HomeListItem) => {
    if (item.type === "featuredItem") return item.item.id;
    return item.type;
  };

  const renderItem: ListRenderItem<HomeListItem> = ({ item }) => {
    switch (item.type) {
      case "top":
        return (
          <TopSection
            onLayout={(e) => setTopHeight(e.nativeEvent.layout.height)}
          />
        );

      case "searchAndCategories":
        return (
          <SearchBlock
            scrollY={scrollY}
            collapseRange={topHeight || 200}
            onPress={() => navigation.navigate("Search" as never)}
          />
        );

      case "topRated":
        return (
          <View>
            <Text
              style={[
                typography.headlineSm as TextStyle,
                styles.sectionTitle,
                { color: colors.textSecondary },
              ]}
            >
              Top Rated
            </Text>
            <FlatList
              data={topRatedPairs}
              keyExtractor={(_, i) => `pair-${i}`}
              renderItem={({ item: pair }) => (
                <View style={styles.topRatedColumn}>
                  <RestaurantCardCompact
                    item={pair[0]}
                    width={COMPACT_CARD_WIDTH}
                    onPress={() => openRestaurant(pair[0].id)}
                  />
                  {pair[1] ? (
                    <RestaurantCardCompact
                      item={pair[1]}
                      width={COMPACT_CARD_WIDTH}
                      onPress={() => openRestaurant(pair[1]!.id)}
                    />
                  ) : null}
                </View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.topRatedContent}
            />
          </View>
        );

      case "featuredTitle":
        return (
          <Text
            style={[
              typography.headlineSm as TextStyle,
              styles.sectionTitle,
              styles.featuredTitle,
              { color: colors.textSecondary },
            ]}
          >
            Featured
          </Text>
        );

      case "featuredItem":
        return (
          <View style={styles.featuredWrap}>
            <RestaurantCardFeatured
              item={item.item}
              onPress={() => openRestaurant(item.item.id)}
            />
          </View>
        );
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: headerGreen }]}>
      <View style={[styles.listWrap, { paddingTop: top }]}>
        <Animated.FlatList<HomeListItem>
          data={items}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          stickyHeaderIndices={[1]}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          style={{ backgroundColor: colors.background }}
        />
      </View>
      <LinearGradient
        pointerEvents="none"
        colors={["transparent", colors.background]}
        style={[styles.bottomFade, { height: FADE_HEIGHT + bottom }]}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  listWrap: { flex: 1 },
  listContent: {
    paddingBottom: 120,
  },
  sectionTitle: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xs,
    fontStyle: "italic",
    fontSize: 16
  },
  featuredTitle: {
    marginTop: spacing.lg,
  },
  topRatedContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  topRatedColumn: {
    gap: spacing.md,
  },
  featuredWrap: {
    paddingHorizontal: spacing.xl,
  },
  bottomFade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
