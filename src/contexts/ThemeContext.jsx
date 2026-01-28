import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      primary: isDark ? "#0e1116" : "#ffffff",
      secondary: isDark ? "#1a1f25" : "#f8fafc",
      tertiary: isDark ? "#2a313c" : "#e2e8f0",

      text: {
        primary: isDark ? "#ffffff" : "#1a202c",
        secondary: isDark ? "#e2e8f0" : "#4a5568",
        muted: isDark ? "#a0aec0" : "#718096",
      },

      accent: "#3de58f",
      accentHover: "#2bc76a",

      border: isDark ? "#374151" : "#e2e8f0",

      card: isDark ? "#1a1f25" : "#ffffff",
      cardHover: isDark ? "#2a313c" : "#f7fafc",

      navbar: isDark ? "rgba(14, 17, 22, 0.95)" : "rgba(255, 255, 255, 0.95)",

      scrollbar: {
        track: isDark ? "#1a1f25" : "#f1f5f9",
        thumb: "#3de58f",
        thumbHover: "#2bc76a",
      },
    },
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
