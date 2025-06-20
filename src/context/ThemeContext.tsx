'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';

interface ThemeContextType {
  dark: boolean;
  toggleDark: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  toggleDark: () => {},
});

// Getting dark mode information from OS!
// You need macOS Mojave + Safari Technology Preview Release 68 to test this currently.
const supportsDarkMode = () => window.matchMedia('(prefers-color-scheme: dark)').matches === true;

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    const newDark = !dark;
    localStorage.setItem('dark', JSON.stringify(newDark));
    setDark(newDark);
  };

  useEffect(() => {
    // Getting dark mode value from localStorage!
    const lsDark = localStorage.getItem('dark');
    if (lsDark !== null) {
      setDark(JSON.parse(lsDark));
    } else if (supportsDarkMode()) {
      setDark(true);
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        dark,
        toggleDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeProvider, useTheme };

