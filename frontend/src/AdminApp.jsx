import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './AdminContext/UserContext';
import Register from './AdminComponents/Register';
import Login from './AdminComponents/Login';
import Header from './AdminComponents/Header';
import Table from './AdminComponents/Table';
import axios from 'axios';

const AdminApp = () => {
  const [message, setMessage] = useState('');
  const [token] = useContext(UserContext);

  const getWelcomeMessage = async () => {
    try {
      const response = await axios.get('/api', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        setMessage(data.message);
      } else {
        console.error(
          'Failed to fetch data:',
          response.status,
          response.statusText
        );
        setMessage('Something went wrong.');
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
      setMessage('Something went wrong.');
    }
  };

  useEffect(() => {
    getWelcomeMessage();
  }, [token]);

  return (
    <>
      <Header title={message} />
      <div className='columns'>
          <div className='column'></div>
          <div className='column m-5 is-two-thirds'>
            {!token ? (
              <div className='columns'>
                <Register />
                <Login />
              </div>
            ) : (
              <Table />
            )}
          </div>

          <div className='column'></div>
        </div>
    </>
  );
};

export default AdminApp;
