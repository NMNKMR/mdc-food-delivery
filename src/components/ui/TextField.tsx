import { Ionicons } from "@expo/vector-icons";
import { forwardRef, useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { lightColors } from "../../../constants/colors";
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";

type Props = TextInputProps & {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ComponentProps<typeof Ionicons>["name"];
  rightIcon?: React.ComponentProps<typeof Ionicons>["name"];
  onRightIconPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

// Styled for the auth screens, which sit on a fixed light background image —
// fixed light colours regardless of theme so the field stays legible.
const TextField = forwardRef<TextInput, Props>(function TextField(
  {
    label,
    error,
    helper,
    leftIcon,
    rightIcon,
    onRightIconPress,
    containerStyle,
    onFocus,
    onBlur,
    style,
    ...rest
  },
  ref,
) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.wrap, containerStyle]}>
      {label ? (
        <Text style={[typography.labelMd as TextStyle, styles.label]}>
          {label}
        </Text>
      ) : null}

      <View
        style={[
          styles.field,
          focused && styles.fieldFocused,
          !!error && styles.fieldError,
        ]}
      >
        {leftIcon ? (
          <Ionicons
            name={leftIcon}
            size={20}
            color={lightColors.primary}
            style={styles.leftIcon}
          />
        ) : null}

        <TextInput
          ref={ref}
          placeholderTextColor={lightColors.textPlaceholder}
          style={[
            styles.input,
            typography.bodyLg as TextStyle,
            { color: lightColors.textPrimary },
            style,
          ]}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />

        {rightIcon ? (
          <Pressable
            onPress={onRightIconPress}
            hitSlop={8}
            style={styles.rightIcon}
          >
            <Ionicons
              name={rightIcon}
              size={20}
              color={lightColors.inputIcon}
            />
          </Pressable>
        ) : null}
      </View>

      {error ? (
        <Text style={[typography.caption as TextStyle, styles.errorText]}>
          {error}
        </Text>
      ) : helper ? (
        <Text style={[typography.caption as TextStyle, styles.helperText]}>
          {helper}
        </Text>
      ) : null}
    </View>
  );
});

export default TextField;

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
  },
  label: {
    marginBottom: spacing.sm,
    color: lightColors.inputLabel,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: lightColors.white,
    borderRadius: radius.xl,
    borderWidth: 1.5,
    borderColor: "transparent",
    paddingHorizontal: spacing.lg,
    minHeight: 56,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  fieldFocused: {
    borderColor: lightColors.primary,
  },
  fieldError: {
    borderColor: lightColors.inputBorderError,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
  },
  leftIcon: {
    marginRight: spacing.md,
  },
  rightIcon: {
    marginLeft: spacing.md,
  },
  errorText: {
    color: lightColors.textError,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
  helperText: {
    color: lightColors.textSecondary,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
});
