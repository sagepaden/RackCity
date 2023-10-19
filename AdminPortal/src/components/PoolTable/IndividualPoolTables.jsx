import React, { useState } from 'react';

const IndividualPoolTable = ({
  poolTable,
  showPoolTableInfoModal,
  onDelete,
  setIsUpdate,
  setPoolTableForm,
  setShowForm,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    poolTable && (
      <>
        <div
          onClick={(e) => {
            setExpanded(!expanded);
            showPoolTableInfoModal();
            e.stopPropagation();
          }}
          className={`flex flex-col items-start justify-between w-full transition-all duration-300 ease-in-out transform bg-black border-2 border-gray-600 rounded-lg hover:border-white mb-3 p-8 ${
            expanded ? 'max-h-[1000px]' : 'max-h-[80px] overflow-hidden'
          }`}
        >
          <div className='w-full'>
            <h2 className='mb-4 font-semibold tracking-widest text-white uppercase title-font'>
              {poolTable?.location_name}
            </h2>
            <p>Pool Table ID: {poolTable?.id}</p>
            <p>Number of Pool Tables: {poolTable?.num_of_pool_tables}</p>
            <p>Discounted Days: {poolTable?.discounted_days}</p>
            <p>Hours: {poolTable?.hours}</p>
            <p>Rating: {poolTable?.rating}</p>
            <p>Latitude: {poolTable?.lat}</p>
            <p>Longitude: {poolTable?.lng}</p>
          </div>
          <div className='flex justify-between w-full mt-4'>
            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                setIsUpdate(true);
                setPoolTableForm(poolTable);
                setShowForm(true);
              }}
              className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  bg-red-600 cursor-pointer hover:bg-red-700 text-white font-bold px-4 py-2 rounded'
            >
              Update
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(poolTable.id);
              }}
              className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  bg-red-600 cursor-pointer hover:bg-red-700 text-white font-bold px-4 py-2 rounded'
            >
              Delete Pool Table
            </button>
          </div>
        </div>
      </>
    )
  );
};

export default IndividualPoolTable;
