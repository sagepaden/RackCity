import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PoolTableList from './Components/PoolTableList';
import { ThemeContext } from './Context/ThemeContext';
import Header from './Components/Header';

function App() {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    setTheme(
      localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark'
    );
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`${theme} ${theme == 'dark' ? 'bg-[#121212]' : null}`}>
        <Header />
        <PoolTableList />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
