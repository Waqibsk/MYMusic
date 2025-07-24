import { useEffect } from 'react';
import { themes } from '@renderer/assets/themes';
const useTheme = (themeName: string,themeType:string) => {
  const theme = themes[themeType][themeName];
  if (!theme) return;

  const root = document.documentElement;

  for (const [key, value] of Object.entries(theme)) {
    root.style.setProperty(key, String(value));
  }
};

export default useTheme;
