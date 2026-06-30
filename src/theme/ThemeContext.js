import React, { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./colors";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === "dark");

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const colors = isDarkMode ? darkTheme : lightTheme;

  const value = {
    isDarkMode,
    toggleTheme,
    colors,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
