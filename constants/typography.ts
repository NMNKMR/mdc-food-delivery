import { TextStyle } from "react-native";

export const typography = {
  headlineLg: {
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 38,
  },
  headlineMd: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
  },
  headlineSm: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
  },
  bodyLg: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  bodyMd: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  labelLg: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
  },
  labelMd: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
} satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;
