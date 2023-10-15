import React from 'react';

const IndividualPoolTable = ({
  poolTable,
  showPoolTableInfoModal,
  onDelete,
  setIsUpdate,
  setPoolTableForm,
  setShowForm,
}) => {
  return (
    poolTable && (
      <>
        <div
          onClick={(e) => {
            showPoolTableInfoModal();
            e.stopPropagation();
          }}
          className='flex flex-wrap items-end justify-between w-full transition duration-500 ease-in-out transform bg-black border-2 border-gray-600 rounded-lg hover:border-white mb-3'
        >
          <div className='w-full xl:w-1/4 md:w-1/4'>
            <div className='relative flex flex-col h-full p-8 '>
              <h2 className='mb-4 font-semibold tracking-widest text-white uppercase title-font'>
                {poolTable?.location_name}
              </h2>
              <p>Pool Table ID: {poolTable?.id}</p>
              <p>Location GPS: {poolTable?.location_gps}</p>
              <p>Number of Pool Tables: {poolTable?.num_of_pool_tables}</p>
              <p>Discounted Days: {poolTable?.discounted_days}</p>
              <p>Hours: {poolTable?.hours}</p>
              <p>Rating: {poolTable?.rating}</p>
            </div>
          </div>
          <div
            className='w-full xl:w-1/4 md:w-1/2 lg:ml-auto'
            style={{ zIndex: 10000 }}
          >
            <div className='relative flex flex-col h-full p-8'>
              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('ID inside IndividualPoolTable:', poolTable.id); // Debug log
                  setIsUpdate(true);
                  setPoolTableForm(poolTable);
                  setShowForm(true);
                }}
                className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  bg-red-600 cursor-pointer hover:bg-red-700 text-white font-bold px-4 py-2 mx-auto mt-3 rounded'
              >
                Update
              </button>
              <div className='flex flex-col md:flex-row'>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(poolTable.id);
                  }}
                  className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  bg-red-600 cursor-pointer hover:bg-red-700 text-white font-bold px-4 py-2 mx-auto mt-3 rounded'
                >
                  Delete Pool Table
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default IndividualPoolTable;
