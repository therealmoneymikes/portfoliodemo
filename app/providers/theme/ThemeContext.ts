import React, { createContext } from 'react'



export interface ThemeContextType {
  appearance: "light" | "dark" | "inherit";
  toggleTheme: () => void;
  getAppearance: (
    lightModeClass: string | string[] | number,
    darkModeClass: string | string[] | number
  ) => string | number | string []
  currentWindowDimensions: {
    width: number;
    height: number;
  };
}
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

export default ThemeContext