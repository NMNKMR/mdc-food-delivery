import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { lightColors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useAuthStore } from "../../../store/authStore";
import Brand from "../../components/shared/Brand";
import Button from "../../components/ui/Button";
import TextField from "../../components/ui/TextField";
import { useStatusBarStyle } from "../../hooks/useStatusBarStyle";
import { AuthStackParamList } from "../../navigation/types";
import { isPhone, isStrongPassword } from "../../utils/validation";

type Props = NativeStackScreenProps<AuthStackParamList, "SignIn">;

type Errors = Partial<{ phone: string; password: string }>;

function SignInScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  useStatusBarStyle("dark");
  const signIn = useAuthStore((s) => s.signIn);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = async () => {
    const next: Errors = {};
    if (!isPhone(phone)) next.phone = "Enter a valid phone number";
    if (!isStrongPassword(password)) next.password = "Use at least 8 characters";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      await signIn({ phone, password });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/auth-bg.png")}
      resizeMode="cover"
      style={styles.bg}
    >
      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        <ScrollView
          contentContainerStyle={[
            styles.content,
            {
              paddingTop: insets.top + spacing.xxxl,
              paddingBottom: insets.bottom + spacing.xxl,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Brand />

          <Text style={[typography.headlineLg as TextStyle, styles.title]}>
            Welcome Back!
          </Text>
          <Text style={[typography.bodyLg as TextStyle, styles.subtitle]}>
            Sign in to continue your healthy journey.
          </Text>

          <View style={styles.form}>
            <TextField
              placeholder="Phone number"
              keyboardType="phone-pad"
              autoComplete="tel"
              textContentType="telephoneNumber"
              leftIcon="call"
              value={phone}
              onChangeText={setPhone}
              error={errors.phone}
            />

            <TextField
              placeholder="Password"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="password"
              textContentType="password"
              leftIcon="lock-closed"
              rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
              onRightIconPress={() => setShowPassword((v) => !v)}
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              containerStyle={styles.field}
            />

            <Pressable hitSlop={8} style={styles.forgot}>
              <Text style={[typography.labelLg as TextStyle, styles.link]}>
                Forgot Password?
              </Text>
            </Pressable>

            <Button
              label="Sign In"
              loading={submitting}
              onPress={onSubmit}
              style={[styles.cta, { backgroundColor: lightColors.buttonPrimary }]}
              textStyle={{ color: lightColors.buttonText }}
            />
          </View>

          <View style={styles.spacer} />

          <View style={styles.footer}>
            <Text style={[typography.bodyMd as TextStyle, styles.footerText]}>
              Don't have an account?{" "}
            </Text>
            <Pressable
              onPress={() => navigation.navigate("SignUp")}
              hitSlop={8}
            >
              <Text style={[typography.labelLg as TextStyle, styles.link]}>
                Sign Up
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  bg: { flex: 1 },
  flex: { flex: 1 },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.xxl,
  },
  title: {
    marginTop: spacing.xxl,
    textAlign: "center",
    color: lightColors.primaryDark,
    fontWeight: "800",
  },
  subtitle: {
    marginTop: spacing.xs,
    textAlign: "center",
    color: lightColors.textSecondary,
  },
  form: {
    marginTop: spacing.xxl,
  },
  field: {
    marginTop: spacing.lg,
  },
  forgot: {
    alignSelf: "flex-end",
    marginTop: spacing.md,
  },
  link: {
    color: lightColors.primary,
  },
  cta: {
    marginTop: spacing.xl,
  },
  spacer: {
    minHeight: spacing.xxl,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: lightColors.textSecondary,
  },
});
