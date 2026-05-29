import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'black' | 'green' | 'white';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themeColors: {
    bg: string;
    text: string;
    accent: string;
    gradientBottom: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('green');

  const getThemeStyles = (currentTheme: Theme) => {
    switch (currentTheme) {
      case 'green':
        return {
          bg: 'bg-gradient-to-br from-green-800 via-emerald-700 to-green-950',
          text: 'text-white',
          accent: 'text-green-200',
          gradientBottom: 'from-green-400 via-white to-green-400'
        };
      case 'white':
        return {
          bg: 'bg-stone-100',
          text: 'text-black',
          accent: 'text-stone-600',
          gradientBottom: 'from-black via-gray-500 to-black'
        };
      case 'black':
      default:
        return {
          bg: 'bg-black',
          text: 'text-yellow-500',
          accent: 'text-yellow-200',
          gradientBottom: 'from-green-600 via-yellow-400 to-red-600'
        };
    }
  };

  const themeColors = getThemeStyles(theme);

  useEffect(() => {
    const body = document.body;
    body.className = '';
    const colorMap: Record<Theme, string> = { white: '#f5f5f4', green: '#166534', black: '#000000' };
    body.style.backgroundColor = colorMap[theme] || '#000000';
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  return context;
};