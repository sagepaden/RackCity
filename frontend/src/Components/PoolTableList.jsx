import React, { useState } from 'react';
import { getPoolTables } from './../Services/GlobalApi'; // Import the Axios API functions

function PoolTableList() {
  const [poolTables, setPoolTables] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPoolTablesData = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const response = await getPoolTables(); // Use the Axios API function from GlobalApi
      const poolTableData = response.data;
      setPoolTables(poolTableData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading back to false after fetching data
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
              {/* Add more properties as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PoolTableList;

// import React, { useState } from 'react';
// import axios from 'axios';

// function PoolTableList() {
//     const [poolTables, setPoolTables] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const getQuote = async () => {
//       try {
//         setLoading(true); // Set loading to true while fetching data
//         const response = await axios.get('http://localhost:8000/api/pooltables/');
//         const poolTableData = response.data; // Assuming the response is an array of objects
//         setPoolTables(poolTableData);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false); // Set loading back to false after fetching data
//       }
//     };

//     return (
//       <div className='App'>
//         <button onClick={getQuote}>Get Pool Tables</button>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div>
//             {poolTables.map((poolTable, index) => (
//               <div key={index}>
//                 <p>Location Name: {poolTable.location_name}</p>
//                 <p>Number of Pool Tables: {poolTable.num_of_pool_tables}</p>
//                 <p>Location GPS: {poolTable.location_gps}</p>
//                 {/* Add more properties as needed */}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
// }
// export default PoolTableList
