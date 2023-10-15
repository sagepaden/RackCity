import React, { useEffect, useState } from 'react';
import FastAPIClient from '../../Services/FastAPIClient';
import config from '../../Services/config';
import AllPoolTables from '../../Components/PoolTable/AllPoolTables';
import DashboardHeader from '../../Components/DashboardHeader/DashBoardHeader';
import Footer from '../../Components/Footer/Footer';
import Loader from '../../Components/Loader';

const client = new FastAPIClient(config);

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [poolTables, setPoolTables] = useState([]);

  useEffect(() => {
    // FETCH ALL THE POOLTABLES
    fetchPoolTables();
  }, []);

  const fetchPoolTables = () => {
    // SET THE LOADER TO TRUE
    setLoading(true);

    // GET ALL THE POOLTABLES FROM THE API
    client.apiClient
      .get('/pool_tables/')
      .then((response) => {
        setLoading(false);

        // SET THE POOLTABLES DATA
        setPoolTables(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching pool tables:', error);
      });
  };

  if (loading) return <Loader />;

  return (
    <>
      <section className='bg-black '>
        <DashboardHeader />

        <div className='container px-5 py-12 mx-auto lg:px-20'>
          <div className='flex flex-col flex-wrap pb-6 mb-12 text-white '>
            <h1 className='mb-6 text-3xl font-medium text-white'>
              PoolTables - Better than all the REST
            </h1>
            <div className='mainViewport'>
              <AllPoolTables poolTables={poolTables} />
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Home;
