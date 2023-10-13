import React from 'react';
import { useSelector } from 'react-redux';
import pool1 from './../assets/Images/poologo.png';

function SideNavList() {
  const poolTableList = useSelector((state) => state.poolTables.poolTableList);
  const loading = useSelector((state) => state.poolTables.loading);

  return (
    <div className='px-1 pt-5 relative'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className=''>
          <div className='flex rounded-xl '>
            <h3 className='text-center p-4 py-0.5 font-bold text-[30px] dark:bg-900'>
              Tables Near You
            </h3>
          </div>
          {poolTableList.map((item, index) => (
            <div
              key={index}
              className={`flex gap-2 items-center cursor-pointer group  transition-all duration-300 rounded-lg p-3 
          ${activeIndex === index ? 'bg-slate-300 dark:bg-gray-700 ' : null}`}
              onClick={() => {
                setActiveIndex(index);
                setSelectedPoolTableId(item.id);
              }}
            >
              <img
                src={pool1}
                className={`dark:invert w-[40px] h-[40px] 
                object-cover rounded-lg group-hover:scale-110  
                transition-all duration-300 ${
                  activeIndex === index ? 'scale-110' : null
                } `}
              />
              <h3
                className={` w-60 text-[18px] group-hover:font-bold   dark:text-white
                transition-all duration-300 ${
                  activeIndex === index ? 'font-bold' : null
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
