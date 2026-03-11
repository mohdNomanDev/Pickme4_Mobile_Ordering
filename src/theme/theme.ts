export const LightColors = {
  primary: "#FF6B6B",
  primaryLight: "#FFEBEB",
  text: "#2D3436",
  textLight: "#636E72",
  background: "#FFFFFF",
  surface: "#F1F2F6",
  border: "#F1F2F6",
  divider: "#D1D2D6",
  overlay: "rgba(0, 0, 0, 0.5)",
};

export const DarkColors = {
  primary: "#FF6B6B",
  primaryLight: "#3D2B2B",
  text: "#FFFFFF",
  textLight: "#A0AEC0",
  background: "#1A202C",
  surface: "#2D3748",
  border: "#4A5568",
  divider: "#4A5568",
  overlay: "rgba(0, 0, 0, 0.7)",
};

// Keep for backward compatibility during migration
export const Colors = LightColors;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export type ThemeColors = typeof LightColors;
