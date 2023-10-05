import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Home from '../../frontend/src/Pages/Home';
import { ThemeProvider } from './Context/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <div>
        <Header />
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
