import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../theme/ThemeContext";

export const ThemeToggleButton = ({ style }) => {
  const { isDarkMode, toggleTheme, colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors.surface, borderColor: colors.border },
        style,
      ]}
      onPress={toggleTheme}
    >
      <Ionicons
        name={isDarkMode ? "sunny" : "moon"}
        size={24}
        color={colors.primary}
      />
    </TouchableOpacity>
  );
};

export default ThemeToggleButton;

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
});
