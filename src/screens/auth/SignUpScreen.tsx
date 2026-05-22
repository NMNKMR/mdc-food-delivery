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
import { isNonEmpty, isPhone, isStrongPassword } from "../../utils/validation";

type Props = NativeStackScreenProps<AuthStackParamList, "SignUp">;

type Errors = Partial<{
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
}>;

function SignUpScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  useStatusBarStyle("dark");
  const signUp = useAuthStore((s) => s.signUp);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): Errors => {
    const next: Errors = {};
    if (!isNonEmpty(firstName)) next.firstName = "First name is required";
    if (!isNonEmpty(lastName)) next.lastName = "Last name is required";
    if (!isPhone(phone)) next.phone = "Enter a valid phone number";
    if (!isStrongPassword(password))
      next.password = "Use at least 8 characters";
    return next;
  };

  const onSubmit = async () => {
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      await signUp({ firstName, lastName, phone, password });
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
              paddingTop: insets.top + spacing.xxl,
              paddingBottom: insets.bottom + spacing.xxl,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Brand />

          <Text style={[typography.headlineLg as TextStyle, styles.title]}>
            Create Account
          </Text>
          <Text style={[typography.bodyLg as TextStyle, styles.subtitle]}>
            Start ordering your healthy meals.
          </Text>

          <View style={styles.form}>
            <View style={styles.row}>
              <View style={styles.half}>
                <TextField
                  placeholder="First name"
                  autoCapitalize="words"
                  autoComplete="given-name"
                  textContentType="givenName"
                  leftIcon="person"
                  value={firstName}
                  onChangeText={setFirstName}
                  error={errors.firstName}
                />
              </View>
              <View style={styles.half}>
                <TextField
                  placeholder="Last name"
                  autoCapitalize="words"
                  autoComplete="family-name"
                  textContentType="familyName"
                  leftIcon="person"
                  value={lastName}
                  onChangeText={setLastName}
                  error={errors.lastName}
                />
              </View>
            </View>

            <TextField
              placeholder="Phone number"
              keyboardType="phone-pad"
              autoComplete="tel"
              textContentType="telephoneNumber"
              leftIcon="call"
              value={phone}
              onChangeText={setPhone}
              error={errors.phone}
              containerStyle={styles.field}
            />

            <TextField
              placeholder="Password"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="new-password"
              textContentType="newPassword"
              leftIcon="lock-closed"
              rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
              onRightIconPress={() => setShowPassword((v) => !v)}
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              containerStyle={styles.field}
            />

            <Button
              label="Create Account"
              loading={submitting}
              onPress={onSubmit}
              style={[styles.cta, { backgroundColor: lightColors.buttonPrimary }]}
              textStyle={{ color: lightColors.buttonText }}
            />
          </View>

          <View style={styles.spacer} />

          <View style={styles.footer}>
            <Text style={[typography.bodyMd as TextStyle, styles.footerText]}>
              Already have an account?{" "}
            </Text>
            <Pressable
              onPress={() => navigation.navigate("SignIn")}
              hitSlop={8}
            >
              <Text style={[typography.labelLg as TextStyle, styles.link]}>
                Sign In
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  bg: { flex: 1 },
  flex: { flex: 1 },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.xxl,
  },
  title: {
    marginTop: spacing.xl,
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
    marginTop: spacing.xl,
  },
  row: {
    flexDirection: "row",
    gap: spacing.md,
  },
  half: {
    flex: 1,
  },
  field: {
    marginTop: spacing.lg,
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
  link: {
    color: lightColors.primary,
  },
});
