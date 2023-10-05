import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PoolTableList from './Components/PoolTableList';
import { ThemeContext } from './Context/ThemeProvider';
import Header from './Components/Header';
import MapComponent from './Components/MapComponent';
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
