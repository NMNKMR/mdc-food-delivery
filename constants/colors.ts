// Shared tokens that don't change between light & dark themes.
// Keep this list small — anything that should adapt belongs in lightColors / darkColors.
const sharedColors = {
  // Fixed brand identity (used on coloured buttons, splash, etc.)
  brand: "#08984e",
  brandLight: "#50C878",
  brandDark: "#005025",

  // Always-white / always-black slots
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",

  // Veg / non-veg indicators (regulated colours, must not flip in dark mode)
  vegIndicator: "#0F8A0F",
  nonVegIndicator: "#B91C1C",
  eggIndicator: "#F4A300",

  // Social auth brand colours
  googleRed: "#EA4335",
  appleBlack: "#000000",
  facebookBlue: "#1877F2",

  // Ratings (gold star is gold in both themes)
  ratingStar: "#FFB400",
  ratingStarEmpty: "#E0E0E0",

  // Promotional / discount accents
  discount: "#FF3B30",
  promoOrange: "#FF8A00",
  badge: "#FF3B30",
  badgeText: "#FFFFFF",
} as const;

export const lightColors = {
  ...sharedColors,

  // -- Brand ---------------------------------------------------------------
  primary: "#08984e",
  primaryLight: "#50C878",
  primaryDark: "#005025",
  primaryContainer: "#bcebc2",
  onPrimary: "#FFFFFF",
  onPrimaryContainer: "#005025",
  primaryMuted: "#E6F4EC",

  secondary: "#56815e",
  secondaryContainer: "#bfeec4",
  onSecondary: "#FFFFFF",
  onSecondaryContainer: "#264f30",

  tertiary: "#99443a",
  tertiaryContainer: "#ffdad5",
  onTertiary: "#FFFFFF",
  onTertiaryContainer: "#7b2e25",

  // -- Surfaces ------------------------------------------------------------
  background: "#F9F9F9",
  surface: "#FFFFFF",
  surfaceDim: "#d5dcd2",
  surfaceBright: "#FFFFFF",
  surfaceContainerLowest: "#FFFFFF",
  surfaceContainerLow: "#F4F7F2",
  surfaceContainer: "#EFF3ED",
  surfaceContainerHigh: "#E9EFE7",
  surfaceContainerHighest: "#E3EAE0",
  surfaceVariant: "#DEE4DB",
  inverseSurface: "#2B322C",
  onInverseSurface: "#ECF3E9",

  // Cards / sheets / modals
  card: "#FFFFFF",
  cardElevated: "#FFFFFF",
  sheet: "#FFFFFF",
  sheetHandle: "#D9D9D9",
  modalBackdrop: "rgba(0, 0, 0, 0.45)",
  scrim: "rgba(0, 0, 0, 0.32)",
  overlay: "rgba(0, 0, 0, 0.6)",

  // -- Text ---------------------------------------------------------------
  textPrimary: "#1A1A1A",
  textSecondary: "#727971",
  textTertiary: "#9AA09A",
  textDisabled: "#BFC4BE",
  textInverse: "#FFFFFF",
  textLink: "#08984e",
  textPlaceholder: "#9AA09A",
  textError: "#ba1a1a",
  textSuccess: "#1B7A3E",
  textOnPrimary: "#FFFFFF",
  textOnDark: "#FFFFFF",

  // -- Borders / outlines / dividers --------------------------------------
  border: "#bfc9be",
  borderSubtle: "#E5E8E4",
  borderStrong: "#9AA09A",
  outline: "#6e7a6e",
  outlineVariant: "#bdcabc",
  divider: "#EDEFEC",
  separator: "rgba(0, 0, 0, 0.06)",

  // -- Inputs --------------------------------------------------------------
  inputFill: "#F2F4F1",
  inputFillFocused: "#FFFFFF",
  inputBorder: "#D7DCD6",
  inputBorderFocused: "#08984e",
  inputBorderError: "#ba1a1a",
  inputPlaceholder: "#9AA09A",
  inputIcon: "#727971",
  inputLabel: "#3E4A3F",

  // -- Buttons -------------------------------------------------------------
  buttonPrimary: "#08984e",
  buttonPrimaryPressed: "#06803F",
  buttonPrimaryDisabled: "#BFE4CC",
  buttonSecondary: "#FFFFFF",
  buttonSecondaryPressed: "#F2F4F1",
  buttonSecondaryBorder: "#bfc9be",
  buttonGhost: "transparent",
  buttonGhostPressed: "rgba(8, 152, 78, 0.08)",
  buttonDestructive: "#ba1a1a",
  buttonDestructivePressed: "#93000a",
  buttonText: "#FFFFFF",
  buttonTextSecondary: "#1A1A1A",

  // -- Tabs / Nav ---------------------------------------------------------
  tabBarBackground: "#FFFFFF",
  tabBarActive: "#08984e",
  tabBarInactive: "#9AA09A",
  tabBarBorder: "#EDEFEC",
  headerBackground: "#FFFFFF",
  headerTint: "#1A1A1A",
  segmentActive: "#08984e",
  segmentInactive: "#F2F4F1",
  segmentActiveText: "#FFFFFF",
  segmentInactiveText: "#3E4A3F",

  // -- Status / feedback --------------------------------------------------
  success: "#4CAF50",
  successContainer: "#D7F0DA",
  onSuccess: "#FFFFFF",
  onSuccessContainer: "#1B5E20",

  warning: "#F59E0B",
  warningContainer: "#FFEFC7",
  onWarning: "#1A1A1A",
  onWarningContainer: "#7A4A00",

  error: "#ba1a1a",
  errorContainer: "#ffdad6",
  onError: "#FFFFFF",
  onErrorContainer: "#93000a",

  info: "#2563EB",
  infoContainer: "#DCE7FF",
  onInfo: "#FFFFFF",
  onInfoContainer: "#0B3A8C",

  // -- Order lifecycle ----------------------------------------------------
  orderPending: "#F59E0B",
  orderConfirmed: "#2563EB",
  orderPreparing: "#FF8A00",
  orderOutForDelivery: "#7C3AED",
  orderDelivered: "#4CAF50",
  orderCancelled: "#ba1a1a",
  orderPendingBg: "#FFEFC7",
  orderConfirmedBg: "#DCE7FF",
  orderPreparingBg: "#FFE5CC",
  orderOutForDeliveryBg: "#EBDDFF",
  orderDeliveredBg: "#D7F0DA",
  orderCancelledBg: "#FFDAD6",

  // -- Food / cuisine tags ------------------------------------------------
  tagPopular: "#FF3B30",
  tagPopularBg: "#FFE5E3",
  tagNew: "#08984e",
  tagNewBg: "#E6F4EC",
  tagOffer: "#FF8A00",
  tagOfferBg: "#FFE5CC",
  tagSpicy: "#E53935",
  tagSpicyBg: "#FFE0DE",

  // -- Map / delivery -----------------------------------------------------
  mapRoute: "#08984e",
  mapMarkerUser: "#2563EB",
  mapMarkerRestaurant: "#FF8A00",
  mapMarkerDriver: "#08984e",
  mapBackdrop: "#E8EEE6",

  // -- Skeletons / loading ------------------------------------------------
  skeletonBase: "#EDEFEC",
  skeletonHighlight: "#F7F8F6",
  shimmer: "rgba(255, 255, 255, 0.6)",

  // -- Shadows ------------------------------------------------------------
  shadow: "rgba(0, 0, 0, 0.06)",
  shadowSoft: "rgba(0, 0, 0, 0.04)",
  shadowMedium: "rgba(0, 0, 0, 0.12)",
  shadowStrong: "rgba(0, 0, 0, 0.18)",

  // -- Icons --------------------------------------------------------------
  iconPrimary: "#1A1A1A",
  iconSecondary: "#727971",
  iconBrand: "#08984e",
  iconInverse: "#FFFFFF",
  iconDisabled: "#BFC4BE",

  // -- Misc ---------------------------------------------------------------
  highlight: "rgba(8, 152, 78, 0.08)",
  pressed: "rgba(0, 0, 0, 0.06)",
  focusRing: "rgba(8, 152, 78, 0.35)",
};

export type ThemeColors = typeof lightColors;

export const darkColors: ThemeColors = {
  ...sharedColors,

  // -- Brand ---------------------------------------------------------------
  primary: "#66de8b",
  primaryLight: "#83fba4",
  primaryDark: "#08984e",
  primaryContainer: "#005227",
  onPrimary: "#00210c",
  onPrimaryContainer: "#83fba4",
  primaryMuted: "#0F2A1A",

  secondary: "#a3d2a9",
  secondaryContainer: "#264f30",
  onSecondary: "#0B2614",
  onSecondaryContainer: "#bfeec4",

  tertiary: "#ffb4a9",
  tertiaryContainer: "#7b2e25",
  onTertiary: "#3f0302",
  onTertiaryContainer: "#ffdad5",

  // -- Surfaces ------------------------------------------------------------
  background: "#0F1410",
  surface: "#171D17",
  surfaceDim: "#0F1410",
  surfaceBright: "#2B322C",
  surfaceContainerLowest: "#0A0F0B",
  surfaceContainerLow: "#171D17",
  surfaceContainer: "#1B221C",
  surfaceContainerHigh: "#252C26",
  surfaceContainerHighest: "#303731",
  surfaceVariant: "#3E4A3F",
  inverseSurface: "#ECF3E9",
  onInverseSurface: "#2B322C",

  card: "#1B221C",
  cardElevated: "#252C26",
  sheet: "#1B221C",
  sheetHandle: "#3E4A3F",
  modalBackdrop: "rgba(0, 0, 0, 0.6)",
  scrim: "rgba(0, 0, 0, 0.5)",
  overlay: "rgba(0, 0, 0, 0.75)",

  // -- Text ---------------------------------------------------------------
  textPrimary: "#ECF3E9",
  textSecondary: "#BDCABC",
  textTertiary: "#8A9189",
  textDisabled: "#4E544E",
  textInverse: "#171D17",
  textLink: "#66de8b",
  textPlaceholder: "#8A9189",
  textError: "#ffb4a9",
  textSuccess: "#66de8b",
  textOnPrimary: "#00210c",
  textOnDark: "#FFFFFF",

  // -- Borders ------------------------------------------------------------
  border: "#3E4A3F",
  borderSubtle: "#252C26",
  borderStrong: "#6E7A6E",
  outline: "#8A9189",
  outlineVariant: "#3E4A3F",
  divider: "#252C26",
  separator: "rgba(255, 255, 255, 0.08)",

  // -- Inputs --------------------------------------------------------------
  inputFill: "#1B221C",
  inputFillFocused: "#252C26",
  inputBorder: "#3E4A3F",
  inputBorderFocused: "#66de8b",
  inputBorderError: "#ffb4a9",
  inputPlaceholder: "#8A9189",
  inputIcon: "#BDCABC",
  inputLabel: "#BDCABC",

  // -- Buttons -------------------------------------------------------------
  buttonPrimary: "#66de8b",
  buttonPrimaryPressed: "#83fba4",
  buttonPrimaryDisabled: "#1F3A29",
  buttonSecondary: "#252C26",
  buttonSecondaryPressed: "#303731",
  buttonSecondaryBorder: "#3E4A3F",
  buttonGhost: "transparent",
  buttonGhostPressed: "rgba(102, 222, 139, 0.12)",
  buttonDestructive: "#ffb4a9",
  buttonDestructivePressed: "#ffdad5",
  buttonText: "#00210c",
  buttonTextSecondary: "#ECF3E9",

  // -- Tabs / Nav ---------------------------------------------------------
  tabBarBackground: "#171D17",
  tabBarActive: "#66de8b",
  tabBarInactive: "#8A9189",
  tabBarBorder: "#252C26",
  headerBackground: "#171D17",
  headerTint: "#ECF3E9",
  segmentActive: "#66de8b",
  segmentInactive: "#1B221C",
  segmentActiveText: "#00210c",
  segmentInactiveText: "#BDCABC",

  // -- Status / feedback --------------------------------------------------
  success: "#66de8b",
  successContainer: "#1F3A29",
  onSuccess: "#00210c",
  onSuccessContainer: "#bfeec4",

  warning: "#FFD071",
  warningContainer: "#4A3300",
  onWarning: "#241A00",
  onWarningContainer: "#FFEFC7",

  error: "#ffb4a9",
  errorContainer: "#93000a",
  onError: "#690005",
  onErrorContainer: "#ffdad6",

  info: "#9BB8FF",
  infoContainer: "#0B3A8C",
  onInfo: "#001A41",
  onInfoContainer: "#DCE7FF",

  // -- Order lifecycle ----------------------------------------------------
  orderPending: "#FFD071",
  orderConfirmed: "#9BB8FF",
  orderPreparing: "#FFB070",
  orderOutForDelivery: "#C9B0FF",
  orderDelivered: "#66de8b",
  orderCancelled: "#ffb4a9",
  orderPendingBg: "#3A2D00",
  orderConfirmedBg: "#0B2347",
  orderPreparingBg: "#3A2300",
  orderOutForDeliveryBg: "#2A1B47",
  orderDeliveredBg: "#1F3A29",
  orderCancelledBg: "#5C1010",

  // -- Food / cuisine tags ------------------------------------------------
  tagPopular: "#FF6B63",
  tagPopularBg: "#3A1715",
  tagNew: "#66de8b",
  tagNewBg: "#1F3A29",
  tagOffer: "#FFB070",
  tagOfferBg: "#3A2300",
  tagSpicy: "#FF6B63",
  tagSpicyBg: "#3A1715",

  // -- Map / delivery -----------------------------------------------------
  mapRoute: "#66de8b",
  mapMarkerUser: "#9BB8FF",
  mapMarkerRestaurant: "#FFB070",
  mapMarkerDriver: "#66de8b",
  mapBackdrop: "#1B221C",

  // -- Skeletons ----------------------------------------------------------
  skeletonBase: "#1B221C",
  skeletonHighlight: "#252C26",
  shimmer: "rgba(255, 255, 255, 0.06)",

  // -- Shadows ------------------------------------------------------------
  shadow: "rgba(0, 0, 0, 0.4)",
  shadowSoft: "rgba(0, 0, 0, 0.3)",
  shadowMedium: "rgba(0, 0, 0, 0.5)",
  shadowStrong: "rgba(0, 0, 0, 0.7)",

  // -- Icons --------------------------------------------------------------
  iconPrimary: "#ECF3E9",
  iconSecondary: "#BDCABC",
  iconBrand: "#66de8b",
  iconInverse: "#171D17",
  iconDisabled: "#4E544E",

  // -- Misc ---------------------------------------------------------------
  highlight: "rgba(102, 222, 139, 0.12)",
  pressed: "rgba(255, 255, 255, 0.06)",
  focusRing: "rgba(102, 222, 139, 0.4)",
};
