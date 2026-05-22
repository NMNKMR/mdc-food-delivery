import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { lightColors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  logoWidth?: number;
  brandWidth?: number;
  hideLogo?: boolean;
};

function Brand({
  containerStyle,
  logoWidth = 88,
  brandWidth = 188,
  hideLogo = false,
}: Props) {
  return (
    <View style={[styles.container, containerStyle]}>
      {hideLogo ? null : (
        <Image
          source={require("../../../assets/images/logo.png")}
          style={{ width: logoWidth, height: 72 }}
          resizeMode="contain"
        />
      )}
      <View>
        <Image
          source={require("../../../assets/images/brand.png")}
          style={{ width: brandWidth, height: 50 }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.taglineRow}>
        <Ionicons name="leaf" size={13} color={lightColors.primary} />
        <Text style={[styles.tagline, { color: lightColors.brandDark }]}>
          Good Food. Good You.
        </Text>
        <Ionicons
          name="leaf"
          size={13}
          color={lightColors.primary}
          style={styles.leafFlip}
        />
      </View>
    </View>
  );
}

export default Brand;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  taglineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    marginBottom: spacing.lg,
    gap: spacing.xs,
  },
  tagline: {
    fontSize: 13,
    fontWeight: "600",
  },
  leafFlip: {
    transform: [{ scaleX: -1 }],
  },
});
