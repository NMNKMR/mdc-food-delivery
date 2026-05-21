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
import { radius, spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";

type Props = TextInputProps & {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ComponentProps<typeof Ionicons>["name"];
  rightIcon?: React.ComponentProps<typeof Ionicons>["name"];
  onRightIconPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

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
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? colors.inputBorderError
    : focused
      ? colors.inputBorderFocused
      : colors.inputBorder;

  return (
    <View style={[styles.wrap, containerStyle]}>
      {label ? (
        <Text style={[typography.labelMd as TextStyle, styles.label, { color: colors.inputLabel }]}>
          {label}
        </Text>
      ) : null}

      <View
        style={[
          styles.field,
          {
            backgroundColor: focused ? colors.inputFillFocused : colors.inputFill,
            borderColor,
          },
        ]}
      >
        {leftIcon ? (
          <Ionicons
            name={leftIcon}
            size={20}
            color={colors.inputIcon}
            style={styles.leftIcon}
          />
        ) : null}

        <TextInput
          ref={ref}
          placeholderTextColor={colors.inputPlaceholder}
          style={[
            styles.input,
            typography.bodyLg as TextStyle,
            { color: colors.textPrimary },
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
          <Pressable onPress={onRightIconPress} hitSlop={8} style={styles.rightIcon}>
            <Ionicons name={rightIcon} size={20} color={colors.inputIcon} />
          </Pressable>
        ) : null}
      </View>

      {error ? (
        <Text style={[typography.caption as TextStyle, { color: colors.textError, marginTop: spacing.xs }]}>
          {error}
        </Text>
      ) : helper ? (
        <Text style={[typography.caption as TextStyle, { color: colors.textSecondary, marginTop: spacing.xs }]}>
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
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    minHeight: 52,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.sm,
  },
  leftIcon: {
    marginRight: spacing.md,
  },
  rightIcon: {
    marginLeft: spacing.md,
  },
});
