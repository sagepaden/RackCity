import React, { useContext, useEffect, useState } from 'react';
import Register from '../AdminComponents/Register';
import Login from '../AdminComponents/Login';
import Header from '../AdminComponents/Header';
import Table from '../AdminComponents/Table';
import { UserContext } from '../AdminContext/UserContext';
import axios from 'axios'; // Import Axios

const AdminPage = () => {
  const [message, setMessage] = useState('');
  const [token] = useContext(UserContext);

  const getWelcomeMessage = async () => {
    try {
      const response = await axios.get('/api'); // Use Axios for the API request

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
  }, []);

  return (
    <>
      <Header title={message} />
      <div className='columns'>
        <div className='column'></div>
        <div className='column m-5 is-two-thirds'>
          {!token ? (
            <div className='columns'>
              <Register /> <Login />
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

export default AdminPage;
