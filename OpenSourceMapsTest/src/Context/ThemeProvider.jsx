import React, { createContext, useState, useEffect } from "react";


export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

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
