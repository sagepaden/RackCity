import React, { useState, useEffect } from 'react';
import { getPoolTables } from '../Services/GlobalApi';
import pool1 from './../assets/Images/pool1.png' 

function SideNavList() {
  const [poolTableList, setPoolTableList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className=''>
          <h3 className='font-bold text-[30px] dark:text-white '>Genres</h3>
          {poolTableList.map((item, index) => (
            <div
              key={index}
              className={`flex gap-2 items-center cursor-pointer group  transition-all duration-300 rounded-lg p-3 
          ${activeIndex == index ? 'bg-slate-300 dark:bg-gray-700 ' : null}`}
              onClick={() => {
                setActiveIndex(index), selectedPoolTableId(item.id);
              }}
            >
              <img
                src={pool1}
                className={`w-[40px] h-[40px] 
                object-cover rounded-lg group-hover:scale-110  
                transition-all duration-300 ${
                  activeIndex == index ? 'scale-110' : null
                } `}
              />
              <h3
                className={`text-[18px] group-hover:font-bold   dark:text-white
                transition-all duration-300 ${
                  activeIndex == index ? 'font-bold' : null
                }`}
              >
                {item.location_name}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SideNavList;
