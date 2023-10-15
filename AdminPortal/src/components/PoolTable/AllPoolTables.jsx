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
  isUpdate,
  onUpdatePoolTable,
  onCreatePoolTable,
  poolTableForm,
  loading,
}) => {
  const [poolTableInfoModal, setPoolTableInfoModal] = useState(false);
  const [error] = useState({}); // Add error state if needed

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
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
              onSubmit={isUpdate ? onUpdatePoolTable : onCreatePoolTable}
              defaultValues={poolTableForm}
              setFormValues={setPoolTableForm}
              error={error}
              loading={loading}
            />
          </div>
        </PopupModal>
      )}
    </>
  );
};

export default AllPoolTables;
