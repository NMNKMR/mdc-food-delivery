import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import Button from "../../components/ui/Button";
import { AuthStackParamList } from "../../navigation/types";
import Brand from "../../components/shared/Brand";
import { lightColors } from "../../../constants/colors";
import { useStatusBarStyle } from "../../hooks/useStatusBarStyle";

type Props = NativeStackScreenProps<AuthStackParamList, "Onboarding">;

function OnboardingScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  useStatusBarStyle("dark");

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require("../../../assets/images/onboarding-1.png")}
        resizeMode="cover"
        style={styles.bg}
      >
        <View
          style={[
            styles.bottomSheet,
            {
              paddingBottom: insets.bottom + spacing.xxxl,
            },
          ]}
        >
          <Brand />
          <Button
            label="Get Started"
            onPress={() => navigation.navigate("SignUp")}
            style={[styles.cta, { backgroundColor: lightColors.buttonPrimary }]}
            textStyle={{ color: lightColors.buttonText }}
          />

          <View style={styles.footer}>
            <Text
              style={[
                typography.bodyMd as TextStyle,
                { color: lightColors.textSecondary },
              ]}
            >
              Already have an account?{" "}
            </Text>
            <Pressable
              onPress={() => navigation.navigate("SignIn")}
              hitSlop={8}
            >
              <Text
                style={[
                  typography.labelLg as TextStyle,
                  { color: lightColors.primary },
                ]}
              >
                Sign In
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default OnboardingScreen;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  bg: { flex: 1, justifyContent: "flex-end" },
  bottomSheet: {
    paddingHorizontal: spacing.xxl,
  },
  cta: {
    marginBottom: spacing.lg,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
