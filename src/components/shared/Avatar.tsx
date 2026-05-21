import { Ionicons } from "@expo/vector-icons";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../../context/theme";
import { useAuthStore } from "../../../store/authStore";

type Props = {
  size?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

function Avatar({ size = 64, style, textStyle }: Props) {
  const { colors } = useTheme();
  const user = useAuthStore((state) => state.user)
  const name = user?.firstName || user?.lastName;

  const initial = name?.trim().charAt(0).toUpperCase() ?? "";

  return (
    <View
      style={[
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.secondary,
        },
        style,
      ]}
    >
      {initial ? (
        <Text
          style={[
            {
              color: colors.onSecondary,
              fontSize: Math.round(size * 0.4),
              fontWeight: "700",
            },
            textStyle,
          ]}
        >
          {initial}
        </Text>
      ) : (
        <Ionicons
          name="person"
          size={Math.round(size * 0.5)}
          color={colors.onPrimary}
        />
      )}
    </View>
  );
}

export default Avatar;

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
