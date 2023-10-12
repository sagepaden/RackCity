import { useState, useEffect } from 'react';
import { getPoolTables } from './GlobalApi';

const useFetchPoolTables = () => {
  const [poolTableList, setPoolTableList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPoolTables = async () => {
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
    fetchPoolTables();
  }, []);

  return { poolTableList, loading };
};

export default useFetchPoolTables;
