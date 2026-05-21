import { useEffect, useState } from "react";
import { ImageSourcePropType, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const HERO_IMAGES: ImageSourcePropType[] = [
  require("../../../assets/images/hero/hero-meal-1.png"),
  require("../../../assets/images/hero/hero-meal-2.png"),
  require("../../../assets/images/hero/hero-meal-3.png"),
  require("../../../assets/images/hero/hero-meal-4.png"),
  require("../../../assets/images/hero/hero-meal-5.png"),
];

export const HERO_SIZE = 120;
const SLIDE_IN_MS = 600;
const HOLD_MS = 2800;
const SLIDE_OUT_MS = 500;
const CYCLE_MS = SLIDE_IN_MS + HOLD_MS + SLIDE_OUT_MS;

function FloatingHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, CYCLE_MS);
    return () => clearTimeout(id);
  }, [index]);

  return (
    <View style={styles.heroSlot} pointerEvents="none">
      <SlidingHeroImage key={index} source={HERO_IMAGES[index]} />
    </View>
  );
}

export default FloatingHero;

function SlidingHeroImage({ source }: { source: ImageSourcePropType }) {
  const tx = useSharedValue(HERO_SIZE + 40);
  const ty = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotate = useSharedValue(-6);

  useEffect(() => {
    tx.value = withSequence(
      withTiming(0, {
        duration: SLIDE_IN_MS,
        easing: Easing.out(Easing.cubic),
      }),
      withDelay(
        HOLD_MS,
        withTiming(-(HERO_SIZE + 40), {
          duration: SLIDE_OUT_MS,
          easing: Easing.in(Easing.cubic),
        }),
      ),
    );

    opacity.value = withSequence(
      withTiming(1, { duration: SLIDE_IN_MS * 0.7 }),
      withDelay(
        HOLD_MS + SLIDE_IN_MS * 0.3,
        withTiming(0, { duration: SLIDE_OUT_MS }),
      ),
    );

    rotate.value = withTiming(0, {
      duration: SLIDE_IN_MS,
      easing: Easing.out(Easing.cubic),
    });

    ty.value = withDelay(
      SLIDE_IN_MS,
      withRepeat(
        withSequence(
          withTiming(-8, {
            duration: 1100,
            easing: Easing.inOut(Easing.quad),
          }),
          withTiming(0, {
            duration: 1100,
            easing: Easing.inOut(Easing.quad),
          }),
        ),
        -1,
        false,
      ),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tx.value },
      { translateY: ty.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.Image
      source={source}
      style={[styles.heroImage, animatedStyle]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  heroSlot: {
    position: "absolute",
    right: 0,
    width: HERO_SIZE,
    height: HERO_SIZE,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  heroImage: {
    width: HERO_SIZE,
    height: HERO_SIZE,
  },
});
