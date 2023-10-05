import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios

const PoolTableModel = ({
  active,
  handleModel,
  token,
  id,
  setErrorMessage,
}) => {
  const [locationName, setLocationName] = useState('');
  const [numOfPoolTables, setNumOfPoolTables] = useState('');
  const [discountedDays, setDiscountedDays] = useState('');
  const [hours, setHours] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    const getPoolTable = async () => {
      try {
        const response = await axios.get(`/api/admin/pooltables/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          setLocationName(data.location_name);
          setNumOfPoolTables(data.num_of_pool_tables);
          setDiscountedDays(data.discounted_days);
          setHours(data.hours);
          setRating(data.rating);
        } else {
          setErrorMessage('Could not get the pool table');
        }
      } catch (error) {
        console.error(
          'An error occurred while fetching pool table data:',
          error
        );
        setErrorMessage('Could not get the pool table');
      }
    };

    if (id) {
      getPoolTable();
    }
  }, [id, token, setErrorMessage]);

  const cleanFormData = () => {
    setLocationName('');
    setNumOfPoolTables('');
    setDiscountedDays('');
    setHours('');
    setRating('');
  };

  const handleCreatePoolTable = async (e) => {
    e.preventDefault();
    try {
      const data = {
        location_name: locationName,
        num_of_pool_tables: numOfPoolTables,
        discountedDays: discountedDays,
        hours: hours,
        rating: rating,
      };

      const response = await axios.post('/api/admin/pooltables', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        cleanFormData();
        handleModel();
      } else {
        setErrorMessage('Something went wrong when creating the pool table');
      }
    } catch (error) {
      console.error('An error occurred while creating the pool table:', error);
      setErrorMessage('Something went wrong when creating the pool table');
    }
  };

  const handleUpdatePoolTable = async (e) => {
    e.preventDefault();
    try {
      const data = {
        location_name: locationName,
        num_of_pool_tables: numOfPoolTables,
        discountedDays: discountedDays,
        hours: hours,
        rating: rating,
      };

      const response = await axios.put(`/api/admin/pooltables/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        cleanFormData();
        handleModel();
      } else {
        setErrorMessage('Something went wrong when updating the pool table');
      }
    } catch (error) {
      console.error('An error occurred while updating the pool table:', error);
      setErrorMessage('Something went wrong when updating the pool table');
    }
  };

  return (
    <div className={`model ${active && 'is-active'}`}>
      <div className='model-background' onClick={handleModel}></div>
      <div className='model-card'>
        <header className='model-card-head has-background-primary-light'>
          <h1 className='model-card-title'>
            {id ? 'Update Table' : 'Create Pool Table'}
          </h1>
        </header>
        <section className='model-card-body'>
          <form>
            <div className='field'>
              <label className='label'>Location Name</label>
              <div className='control'>
                <input
                  type='text'
                  placeholder='Enter Location Name'
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className='input'
                  required
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Number of Pool Tables</label>
              <div className='control'>
                <input
                  type='text'
                  placeholder='Enter Number of Pool Tables'
                  value={numOfPoolTables}
                  onChange={(e) => setNumOfPoolTables(e.target.value)}
                  className='input'
                  required
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Discounted Days</label>
              <div className='control'>
                <input
                  type='text'
                  placeholder='Enter Discounted Days'
                  value={discountedDays}
                  onChange={(e) => setDiscountedDays(e.target.value)}
                  className='input'
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Hours</label>
              <div className='control'>
                <input
                  type='Hours'
                  placeholder='Enter Hours'
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className='input'
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Rating</label>
              <div className='control'>
                <input
                  type='text'
                  placeholder='Enter Rating'
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className='input'
                />
              </div>
            </div>
          </form>
        </section>
        <footer className='model-card-foot has-background-primary-light'>
          {id ? (
            <button className='button is-info' onClick={handleUpdatePoolTable}>
              Update
            </button>
          ) : (
            <button
              className='button is-primary'
              onClick={handleCreatePoolTable}
            >
              Create
            </button>
          )}
          <button className='button' onClick={handleModel}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PoolTableModel;
