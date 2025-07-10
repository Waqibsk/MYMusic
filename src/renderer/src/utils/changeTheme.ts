import { useEffect } from 'react';
import { themes } from '@renderer/assets/themes';
const useTheme = (themeName: string) => {
  const theme = themes[themeName];
  if (!theme) return;

  const root = document.documentElement;

  for (const [key, value] of Object.entries(theme)) {
    root.style.setProperty(key, value);
  }
};
export default useTheme;
