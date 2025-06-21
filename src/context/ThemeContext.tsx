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

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    const newDark = !dark;
    localStorage.setItem('dark', JSON.stringify(newDark));
    setDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
  };

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDark(isDark);
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

