import React, { useState, useEffect } from 'react';
import { getPoolTables } from '../Services/GlobalApi';

function PopularPoolTableList() {
  const [poolTableList, setPoolTableList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPoolTablesData = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const response = await getPoolTables(); // Use the Axios API function from GlobalApi
      const poolTableData = response.data;
      setPoolTableList(poolTableData); // Update the state with fetched data
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading back to false after fetching data
    }
  };

  useEffect(() => {
    getPoolTablesData(); // Fetch data when the component mounts
  }, []);

  return (
    <div className='mt-5'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2 className='font-bold text-[30px] dark:text-white'>
            Popular Tables
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-7'>
            {poolTableList.map((item) => (
              <div
                className='pb-14 bg-slate-300 dark:bg-gray-700 p-4 rounded-lg h-full 
                                hover:scale-110 transition-all duration-300 cursor-pointer'
                key={item.id}
              >
                <div>
                  <h2 className='text-[20px] dark:text-white font-bold'>
                    {item.location_name}
                    <span className='p-1 rounded-sm ml-2 text-[10px] bg-green-100 text-green-700 font-medium'>
                      {item.discounted_days}
                    </span>
                  </h2>
                  <h2 className='text-gray-500 '>
                    ⭐{item.rating} 💬{item.discounted_days} 🔥
                    {item.num_of_pool_tables}
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

// import React from 'react';
// import { getPoolTables } from '../Services/GlobalApi';

// function PopularPoolTableList() {
//     const [poolTables, setPoolTables] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const getPoolTablesData = async () => {
//         try {
//             setLoading(true); // Set loading to true while fetching data
//             const response = await getPoolTables(); // Use the Axios API function from GlobalApi
//             const poolTableData = response.data;
//             setPoolTables(poolTableData);
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setLoading(false); // Set loading back to false after fetching data
//         }
//     };

//     return (

//         <div className='mt-5'>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//       <h2 className='font-bold text-[30px] dark:text-white'>Popular Tables</h2>
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2
//          lg:grid-cols-3 gap-6 mt-7'
//       >
//         {poolTableList.map((item) => (
//           <div
//             className='pb-14 bg-slate-300 dark:bg-gray-700  p-4 rounded-lg h-full
//                 hover:scale-110 transition-all duration-300 cursor-pointer'
//             onLoad={() => getPoolTables(item.id)}
//             key={item.id}
//           >
//             {/* <img src={item.background_image} width={1080}
//                     className='w-full h-[80%] rounded-xl object-cover'/> */}
//             <div>
//               <h2 className='text-[20px] dark:text-white font-bold'>
//                 {item.location_name}
//                 <span className='p-1 rounded-sm ml-2 text-[10px] bg-green-100 text-green-700 font-medium'>
//                   {item.discounted_days}
//                 </span>
//               </h2>
//               <h2 className='text-gray-500 '>
//                 ⭐{item.rating} 💬{item.discounted_days} 🔥
//                 {item.num_of_pool_tables}
//               </h2>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>

//   )
// }

// export default PopularPoolTableList;
