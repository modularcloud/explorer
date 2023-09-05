"use client";
import * as React from "react";

interface Props {
  children: React.ReactNode;
  currentColor?: string;
}

interface ThemeContextType {
  mainColor: string;
  setTheme: (themeValue: Omit<ThemeContextType, "setTheme">) => void;
}

const ThemeContext = React.createContext<ThemeContextType | null>(null);

/**
 * This component is used to set the main color for each network
 * @returns
 */
export function ThemeProvider({ children, currentColor }: Props) {
  const [themeValue, setThemeValue] = React.useState({
    mainColor: currentColor ?? `#8457FF`,
  });

  return (
    <ThemeContext.Provider
      value={{
        ...themeValue,
        setTheme: setThemeValue,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const contextValue = React.useContext(ThemeContext);

  if (!contextValue) {
    throw new Error("Context should be set");
  }

  const { setTheme, ...values } = contextValue;

  return [values, setTheme] as const;
}
