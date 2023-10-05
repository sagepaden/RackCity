import React, { useState } from 'react';
import { getPoolTables } from '../Services/GlobalApi';

function AllPoolTableList() {
  const [poolTables, setPoolTables] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPoolTablesData = async () => {
    try {
      setLoading(true);
      const response = await getPoolTables();
      const poolTableData = response.data;
      setPoolTables(poolTableData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='App'>
      <button onClick={getPoolTablesData}>Get Pool Tables</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {poolTables.map((poolTable, index) => (
            <div key={index}>
              <p>Location Name: {poolTable.location_name}</p>
              <p>Number of Pool Tables: {poolTable.num_of_pool_tables}</p>
              <p>Location GPS: {poolTable.location_gps}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllPoolTableList;
