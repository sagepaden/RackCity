import React from 'react';
import { Provider } from 'react-redux'
import store from './Store'
import Header from './Components/Header';
import Home from '../../frontend/src/Pages/Home';
import { ThemeProvider } from './Context/ThemeProvider';

function App() {
  return (
    <Provider store={store}>
    <div>
      <ThemeProvider>
        <div>
          <Header />
          <Home />
        </div>
      </ThemeProvider>
      </div>
      </Provider>
  );
}

export default App;
