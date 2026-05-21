import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type Size = "md" | "lg";

type Props = Omit<PressableProps, "style"> & {
  label: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
};

function Button({
  label,
  variant = "primary",
  size = "lg",
  loading = false,
  fullWidth = true,
  leftIcon,
  disabled,
  style,
  labelStyle,
  textStyle,
  ...rest
}: Props) {
  const { colors } = useTheme();

  const palette: Record<Variant, { bg: string; bgPressed: string; bgDisabled: string; fg: string; border?: string }> = {
    primary: {
      bg: colors.buttonPrimary,
      bgPressed: colors.buttonPrimaryPressed,
      bgDisabled: colors.buttonPrimaryDisabled,
      fg: colors.buttonText,
    },
    secondary: {
      bg: colors.buttonSecondary,
      bgPressed: colors.buttonSecondaryPressed,
      bgDisabled: colors.buttonPrimaryDisabled,
      fg: colors.buttonTextSecondary,
      border: colors.buttonSecondaryBorder,
    },
    ghost: {
      bg: colors.buttonGhost,
      bgPressed: colors.buttonGhostPressed,
      bgDisabled: colors.transparent,
      fg: colors.primary,
    },
    destructive: {
      bg: colors.buttonDestructive,
      bgPressed: colors.buttonDestructivePressed,
      bgDisabled: colors.buttonPrimaryDisabled,
      fg: colors.onError,
    },
  };

  const tone = palette[variant];
  const isDisabled = disabled || loading;
  const heights: Record<Size, number> = { md: 44, lg: 52 };

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          height: heights[size],
          backgroundColor: isDisabled
            ? tone.bgDisabled
            : pressed
              ? tone.bgPressed
              : tone.bg,
          borderColor: tone.border ?? "transparent",
          borderWidth: tone.border ? 1 : 0,
          width: fullWidth ? "100%" : undefined,
          opacity: isDisabled && !loading ? 0.6 : 1,
        },
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={tone.fg} />
      ) : (
        <View style={styles.content}>
          {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
          <Text
            style={[
              typography.labelLg as TextStyle,
              { color: tone.fg, fontSize: 16 },
              labelStyle,
              textStyle,
            ]}
          >
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: spacing.sm,
  },
});
