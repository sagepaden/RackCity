import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Home from './Pages/Home/Home';
import PoolTableDashboard from './Pages/PoolTableDashboard/PoolTableDashboard';
import ErrorPage from './Pages/ErrorPage/ErrorPage';

const App = () => {
  return (
    <div className='App bg-black'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} /> {/* New Route for Home */}
          <Route exact path='/pool_tables' element={<PoolTableDashboard />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/sign-up' element={<SignUp />} />
          <Route exact={true} path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
