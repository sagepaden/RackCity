import React, { createContext, useContext, useState, useEffect } from "react";

// Create a ThemeContext
export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  // Define your theme state and theme change function
  const [theme, setTheme] = useState('light');

  // Retrieve theme from local storage on component mount
  useEffect(() => {
    setTheme(localStorage.getItem('theme') || 'dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
    <div className={`${theme} ${theme == 'dark' ? 'bg-[#494C4F]' : null}`}>
        {children}
        </div>
    </ThemeContext.Provider>
  );
};
