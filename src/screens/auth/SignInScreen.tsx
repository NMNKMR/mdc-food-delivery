import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";
import { useAuthStore } from "../../../store/authStore";
import Button from "../../components/ui/Button";
import TextField from "../../components/ui/TextField";
import { AuthStackParamList } from "../../navigation/types";
import { isPhone, isStrongPassword } from "../../utils/validation";
import Brand from "../../components/shared/Brand";

type Props = NativeStackScreenProps<AuthStackParamList, "SignIn">;

type Errors = Partial<{ phone: string; password: string }>;

function SignInScreen({ navigation }: Props) {
  const { colors, isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();
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
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={"padding"}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + spacing.sm,
            paddingBottom: insets.bottom + spacing.xxl,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Brand containerStyle={{paddingVertical: 44}} />

        <Text
          style={[
            typography.headlineLg as TextStyle,
            styles.title,
            { color: colors.textPrimary },
          ]}
        >
          Welcome back
        </Text>
        <Text
          style={[
            typography.bodyLg as TextStyle,
            styles.subtitle,
            { color: colors.textSecondary },
          ]}
        >
          Sign in to continue ordering.
        </Text>

        <TextField
          label="Phone number"
          placeholder="+91 90000 00000"
          keyboardType="phone-pad"
          autoComplete="tel"
          textContentType="telephoneNumber"
          leftIcon="call-outline"
          value={phone}
          onChangeText={setPhone}
          error={errors.phone}
        />

        <TextField
          label="Password"
          placeholder="Your password"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoComplete="password"
          textContentType="password"
          leftIcon="lock-closed-outline"
          rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
          onRightIconPress={() => setShowPassword((v) => !v)}
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          containerStyle={styles.field}
        />

        <View style={styles.forgotRow}>
          <Pressable hitSlop={8}>
            <Text
              style={[
                typography.labelMd as TextStyle,
                { color: colors.primary },
              ]}
            >
              Forgot Password?
            </Text>
          </Pressable>
        </View>

        <Button
          label="Sign In"
          loading={submitting}
          onPress={onSubmit}
          style={styles.cta}
        />

        <View style={styles.footer}>
          <Text
            style={[
              typography.bodyMd as TextStyle,
              { color: colors.textSecondary },
            ]}
          >
            Don't have an account?{" "}
          </Text>
          <Pressable onPress={() => navigation.navigate("SignUp")} hitSlop={8}>
            <Text
              style={[
                typography.labelLg as TextStyle,
                { color: colors.primary },
              ]}
            >
              Create account
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    paddingHorizontal: spacing.xl,
  },
  title: {
    marginBottom: spacing.xs,
    textAlign: "center",
  },
  subtitle: {
    marginBottom: spacing.xxxl,
    textAlign: "center",
  },
  field: {
    marginTop: spacing.lg,
  },
  forgotRow: {
    alignItems: "flex-end",
    marginTop: spacing.md,
  },
  cta: {
    marginTop: spacing.xxl,
  },
  footer: {
    marginTop: spacing.xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
