import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSystemTheme = (): Theme => {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
};

const THEME_COLORS = {
  light: "#DE4535",
  dark: "#2067ff",
};

const createCursorSvg = (color: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><circle cx="6" cy="6" r="5" fill="${color}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 6 6, auto`;
};

const createPointerSvg = (color: string) => {
  const svg = `<svg width="12" height="12" viewBox="-2 -2 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.317093 6.14239C-1.10242 2.49323 2.49321 -1.1024 6.14237 0.31712L22.2537 6.58441C25.2817 7.76231 26.1017 11.6628 23.8043 13.9603L13.9602 23.8043C11.6628 26.1017 7.76228 25.2818 6.58438 22.2537L0.317093 6.14239Z" fill="${color}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 6 6, pointer`;
};

const updateCursors = (theme: Theme) => {
  const color = THEME_COLORS[theme];
  document.documentElement.style.setProperty("--cursor-default", createCursorSvg(color));
  document.documentElement.style.setProperty("--cursor-pointer", createPointerSvg(color));
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(getSystemTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    updateCursors(theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
