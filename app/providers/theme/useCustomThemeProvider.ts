import { useContext } from "react";
import ThemeContext from "./ThemeContext";

export const useCustomThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("useThemeContext myst be used within a ThemeProvider");
  return context;
};
