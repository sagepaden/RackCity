import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Create a root for the main app
const mainAppRoot = document.getElementById('root');
ReactDOM.createRoot(mainAppRoot).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
