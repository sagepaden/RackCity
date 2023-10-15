import React, { useEffect, useState } from 'react';
import FastAPIClient from '../../Services/FastAPIClient';
import config from '../../Services/config';
import DashboardHeader from '../../Components/DashboardHeader/DashBoardHeader';
import Footer from '../../Components/Footer/Footer';
import AllPoolTables from '../../Components/PoolTable/AllPoolTables';
import PoolTableForm from '../../Components/Forms/PoolTableForm';
// import Button from '../../Components/Button/Button';
import Loader from '../../Components/Loader';
import PopupModal from '../../Components/Modal/PopupModal';

const client = new FastAPIClient(config);

const PoolTableDashboard = () => {
  const [error, setError] = useState({
    location_name: '',
    num_of_pool_tables: '',
    location_gps: '',
    discounted_days: '',
    hours: '',
    rating: '',
  });
  const [poolTableForm, setPoolTableForm] = useState({
    location_name: '',
    num_of_pool_tables: '',
    location_gps: '',
    discounted_days: '',
    hours: '',
    rating: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [poolTables, setPoolTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false); // New state variable

  const fetchAllPoolTables = () => {
    client.getPoolTables().then((data) => {
      setRefreshing(false);
      setPoolTables(data);
    });
  };

  const onCreatePoolTable = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    client.createPoolTable(poolTableForm).then(() => {
      fetchAllPoolTables();
      setLoading(false);
      setShowForm(false);
    });
  };

  const onUpdatePoolTable = (id) => {
    const poolTableToUpdate = poolTables.find((pt) => pt.id === id);
    if (poolTableToUpdate) {
      setPoolTableForm(poolTableToUpdate);
      setShowForm(true);
    }
  };

  const onDeletePoolTable = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this pool table?'
    );
    if (confirmDelete) {
      client.deletePoolTable(id).then(() => {
        fetchAllPoolTables();
      });
    }
  };

  useEffect(() => {
    fetchAllPoolTables();
  }, []);

  if (refreshing) return <Loader />;

  return (
    <>
      <section
        className='flex flex-col bg-black text-center'
        style={{ minHeight: '100vh' }}
      >
        <DashboardHeader />
        <div className='container px-5 pt-6 text-center mx-auto lg:px-20'>
          <h1 className='mb-12 text-3xl font-medium text-white'>
            PoolTables - Better than all the REST
          </h1>
          <button
            className='my-5 text-white bg-teal-500 p-3 rounded'
            onClick={() => {
              setIsUpdate(false);
              setShowForm(!showForm);
            }}
          >
            Create PoolTable
          </button>
          <p className='text-base leading-relaxed text-white'>
            Latest poolTables
          </p>
          <div className='mainViewport text-white'>
            {poolTables.length > 0 ? (
              <AllPoolTables
                poolTables={poolTables}
                onDelete={onDeletePoolTable}
                onUpdate={onUpdatePoolTable} // Pass the new onEdit function
              />
            ) : (
              <p>No poolTables found!</p>
            )}
          </div>
        </div>
        <Footer />
      </section>
      {showForm && (
        <PopupModal
          modalTitle={isUpdate ? 'Update PoolTable' : 'Create PoolTable'}
          onCloseBtnPress={() => {
            setShowForm(false);
            setError({});
            setIsUpdate(false); // Reset isUpdate when closing the form
          }}
        >
          <PoolTableForm
            onSubmit={isUpdate ? onUpdatePoolTable : onCreatePoolTable}
            formValues={poolTableForm} // Changed from poolTableForm
            setFormValues={setPoolTableForm} // Changed from setPoolTableForm
            error={error}
            setError={setError}
            loading={loading}
          />
        </PopupModal>
      )}
    </>
  );
};

export default PoolTableDashboard;
