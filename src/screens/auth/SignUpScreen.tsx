import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  KeyboardAvoidingView,
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
import { isNonEmpty, isPhone, isStrongPassword } from "../../utils/validation";
import Brand from "../../components/shared/Brand";

type Props = NativeStackScreenProps<AuthStackParamList, "SignUp">;

type Errors = Partial<{
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
}>;

function SignUpScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
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
        <Brand containerStyle={{ paddingVertical: 44 }} />

        <Text
          style={[
            typography.headlineLg as TextStyle,
            styles.title,
            { color: colors.textPrimary },
          ]}
        >
          Create account
        </Text>
        <Text
          style={[
            typography.bodyLg as TextStyle,
            styles.subtitle,
            { color: colors.textSecondary },
          ]}
        >
          Start ordering your healthy meals.
        </Text>

        <View style={styles.row}>
          <View style={styles.half}>
            <TextField
              label="First name"
              placeholder="Jane"
              autoCapitalize="words"
              autoComplete="given-name"
              textContentType="givenName"
              value={firstName}
              onChangeText={setFirstName}
              error={errors.firstName}
            />
          </View>
          <View style={styles.half}>
            <TextField
              label="Last name"
              placeholder="Doe"
              autoCapitalize="words"
              autoComplete="family-name"
              textContentType="familyName"
              value={lastName}
              onChangeText={setLastName}
              error={errors.lastName}
            />
          </View>
        </View>

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
          containerStyle={styles.field}
        />

        <TextField
          label="Password"
          placeholder="At least 8 characters"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoComplete="new-password"
          textContentType="newPassword"
          leftIcon="lock-closed-outline"
          rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
          onRightIconPress={() => setShowPassword((v) => !v)}
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          containerStyle={styles.field}
        />

        <Button
          label="Create account"
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
            Already have an account?{" "}
          </Text>
          <Pressable onPress={() => navigation.navigate("SignIn")} hitSlop={8}>
            <Text
              style={[
                typography.labelLg as TextStyle,
                { color: colors.primary },
              ]}
            >
              Sign In
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignUpScreen;

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
    marginTop: spacing.xxl,
  },
  footer: {
    marginTop: spacing.xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
