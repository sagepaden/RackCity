import React, { useState, useEffect } from 'react';
import { getPoolTables } from '../Services/GlobalApi';
import pool4 from '../assets/Images/poologo.png';
import './../app.css';

function PopularPoolTableList() {
  const [poolTableList, setPoolTableList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPoolTablesData = async () => {
    try {
      setLoading(true);
      const response = await getPoolTables();
      const poolTableData = response.data;
      setPoolTableList(poolTableData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPoolTablesData();
  }, []);

  return (
    <div className='mx-5'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='pt-60'>
          {/* <div className='flex bg-red-300 rounded-xl '>
            <h2 className='max-w-30 text-center font-bold text-[30px] dark:text-white'>
              Popular Tables
            </h2>
          </div> */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-7 opactiy-80'>
            {poolTableList.map((item) => (
              <div
                className='pb-14 bg-#FD95A7 dark:bg-teal-90 p-4 rounded-lg h-full 
                                hover:scale-110 transition-all duration-300 cursor-pointer '
                key={item.id}
              >
                <div className='relative opactiy-80 '></div>
                <img
                  src={pool4}
                  width={1080}
                  className='w-full h-[80%] rounded-xl object-cover '
                />
                <div>
                  <h2 className='text-[20px] dark:text-white font-bold'>
                    {item.location_name}
                    <span className='p-1 rounded-sm ml-2 text-[10px] bg-white text-green-700 font-medium'>
                      {item.discounted_days}
                    </span>
                  </h2>
                  <h2 className='text-gray-500 '>
                    Rating: {item.rating} Discounted Days:{' '}
                    {item.discounted_days} Number Of Pool Tables:
                    {item.num_of_pool_tables}
                    <div className='z-10 p-16'></div>
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PopularPoolTableList;
