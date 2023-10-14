import PoolTable from '../PoolTable/PoolTable';
import React, { useState } from 'react';
import PopupModal from '../Modal/PopupModal';
import FormInput from '../FormInput/FormInput';

const PoolTableTable = ({ poolTables, onDelete }) => {
  const [poolTableInfoModal, setPoolTableInfoModal] = useState(false);

  return (
    <>
      <div className='sections-list'>
        {poolTables.length &&
          poolTables.map((poolTable) => (
            <PoolTable
              showPoolTableInfoModal={() => setPoolTableInfoModal(poolTable)}
              key={poolTable.id}
              poolTable={poolTable}
              onDelete={onDelete}
            />
          ))}
        {!poolTables.length && <p>No poolTables found!</p>}
      </div>
      {poolTableInfoModal && (
        <PopupModal
          modalTitle={'PoolTable Info'}
          onCloseBtnPress={() => {
            setPoolTableInfoModal(false);
          }}
        >
          <div className='mt-4 text-left'>
            <form className='mt-5'>
              <FormInput
                disabled
                type={'text'}
                name={'location_name'}
                label={'Location Name'}
                value={poolTableInfoModal?.location_name}
              />
              <FormInput
                disabled
                type={'text'}
                name={'num_of_pool_tables'}
                label={'Number of Pool Tables'}
                value={poolTableInfoModal?.num_of_pool_tables}
              />
              <FormInput
                disabled
                type={'text'}
                name={'location_gps'}
                label={'Location GPS'}
                value={poolTableInfoModal?.location_gps}
              />
              <FormInput
                disabled
                type={'text'}
                name={'discounted_days'}
                label={'days with discounted pool'}
                value={poolTableInfoModal?.discounted_days}
              />
              <FormInput
                disabled
                type={'text'}
                name={'hours'}
                label={'Location Hours'}
                value={poolTableInfoModal?.hours}
              />
              <FormInput
                disabled
                type={'text'}
                name={'rating'}
                label={'Location Rating(1-5)'}
                value={poolTableInfoModal?.rating}
              />
            </form>
          </div>
        </PopupModal>
      )}
    </>
  );
};

export default PoolTableTable;
