import React, { useEffect, useState } from 'react';
import FastAPIClient from '../../Services/FastAPIClient';
import config from '../../config';
import DashboardHeader from '../../components/DashboardHeader/DashBoardHeader';
import Footer from '../../components/Footer/Footer';
import PoolTableTable from '../../components/PoolTableTable/PoolTableTable.jsx';
import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader';
import PopupModal from '../../components/Modal/PopupModal';

const client = new FastAPIClient(config);

const ProfileView = ({ poolTables, onDelete }) => {
  return (
    <>
      <PoolTableTable
        poolTables={poolTables}
        showUpdate={true}
        onDelete={onDelete}
      />
    </>
  );
};

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
              setShowForm(!showForm);
            }}
          >
            Create PoolTable
          </button>

          <p className='text-base leading-relaxed text-white'>
            Latest poolTables
          </p>
          <div className='mainViewport text-white'>
            {poolTables.length && (
              <ProfileView
                poolTables={poolTables}
                fetchAllPoolTables={fetchAllPoolTables}
                onDelete={onDeletePoolTable}
              />
            )}
          </div>
        </div>

        <Footer />
      </section>
      {showForm && (
        <PopupModal
          modalTitle={'Create PoolTable'}
          onCloseBtnPress={() => {
            setShowForm(false);
            setError({});
          }}
        >
          <div className='mt-4 text-left'>
            <form className='mt-5' onSubmit={(e) => onCreatePoolTable(e)}>
              <FormInput
                type={'text'}
                name={'location_name'}
                label={'Location Name'}
                error={error.location_name}
                value={poolTableForm.location_name}
                onChange={(e) =>
                  setPoolTableForm({
                    ...poolTableForm,
                    location_name: e.target.value,
                  })
                }
              />
              <FormInput
                type={'text'}
                name={'num_of_pool_tables'}
                label={'Number of Pool Tables'}
                error={error.num_of_pool_tables}
                value={poolTableForm.num_of_pool_tables}
                onChange={(e) =>
                  setPoolTableForm({
                    ...poolTableForm,
                    num_of_pool_tables: e.target.value,
                  })
                }
              />
              <FormInput
                type={'text'}
                name={'location_gps'}
                label={'Location GPS'}
                error={error.location_gps}
                value={poolTableForm.location_gps}
                onChange={(e) =>
                  setPoolTableForm({
                    ...poolTableForm,
                    location_gps: e.target.value,
                  })
                }
              />
              <FormInput
                type={'text'}
                name={'discounted_days'}
                label={'Days with Discounted Pool'}
                error={error.discounted_days}
                value={poolTableForm.discounted_days}
                onChange={(e) =>
                  setPoolTableForm({
                    ...poolTableForm,
                    discounted_days: e.target.value,
                  })
                }
              />
              <FormInput
                type={'text'}
                name={'hours'}
                label={'Location Hours'}
                error={error.hours}
                value={poolTableForm.hours}
                onChange={(e) =>
                  setPoolTableForm({
                    ...poolTableForm,
                    hours: e.target.value,
                  })
                }
              />
              <FormInput
                type={'text'}
                name={'rating'}
                label={'Rating(1-5)'}
                error={error.rating}
                value={poolTableForm.rating}
                onChange={(e) =>
                  setPoolTableForm({
                    ...poolTableForm,
                    rating: e.target.value,
                  })
                }
              />
              <Button
                loading={loading}
                error={error}
                title={'Create PoolTable'}
              />
            </form>
          </div>
        </PopupModal>
      )}
    </>
  );
};

export default PoolTableDashboard;
