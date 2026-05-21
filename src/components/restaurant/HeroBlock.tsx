import { Image, StyleSheet, View } from "react-native";
import { Restaurant } from "../../../constants/data";

type Props = {
  restaurant: Restaurant;
};

function HeroBlock({ restaurant }: Props) {
  return (
    <View>
      <Image source={restaurant.image} style={styles.image} resizeMode="cover" />
    </View>
  );
}

export default HeroBlock;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 280,
  },
});
