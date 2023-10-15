import React, { useState } from 'react';
import PopupModal from '../Modal/PopupModal';
import PoolTableForm from '../Forms/PoolTableForm'; // Import PoolTableForm
import IndividualPoolTable from './IndividualPoolTables';

const AllPoolTables = ({
  poolTables,
  onDelete,
  onUpdate,
  setIsUpdate,
  setPoolTableForm,
  setShowForm,
}) => {
  const [poolTableInfoModal, setPoolTableInfoModal] = useState(false);
  const [error, setError] = useState({}); // Add error state if needed

  return (
    <>
      <div className='sections-list'>
        {poolTables.length > 0 ? (
          poolTables.map((poolTable) => (
            <IndividualPoolTable
              key={poolTable.id}
              poolTable={poolTable}
              onDelete={onDelete}
              onUpdate={onUpdate}
              setIsUpdate={setIsUpdate}
              setPoolTableForm={setPoolTableForm}
              setShowForm={setShowForm}
            />
          ))
        ) : (
          <p>No poolTables found!</p>
        )}
      </div>
      {poolTableInfoModal && (
        <PopupModal
          modalTitle={'PoolTable Info'}
          onCloseBtnPress={() => {
            setPoolTableInfoModal(false);
          }}
        >
          <div className='mt-4 text-left'>
            <PoolTableForm
              poolTableForm={poolTableInfoModal}
              setPoolTableForm={setPoolTableInfoModal}
              error={error}
              setError={setError}
              disabled={true}
            />
          </div>
        </PopupModal>
      )}
    </>
  );
};

export default AllPoolTables;
