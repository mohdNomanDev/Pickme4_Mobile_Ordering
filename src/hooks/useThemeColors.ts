import { useColorScheme } from 'react-native';
import { useAppSelector } from '../store/store';
import { LightColors, DarkColors, ThemeColors } from '../theme/theme';

export const useThemeColors = (): ThemeColors => {
  const mode = useAppSelector((state) => state.theme.mode);
  const systemColorScheme = useColorScheme();

  if (mode === 'system') {
    return systemColorScheme === 'dark' ? DarkColors : LightColors;
  }

  return mode === 'dark' ? DarkColors : LightColors;
};
