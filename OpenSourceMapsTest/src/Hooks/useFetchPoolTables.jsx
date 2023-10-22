import { useState, useEffect } from 'react';
import { getPoolTables } from '../Services/GlobalApi';

const useFetchPoolTables = () => {
  const [poolTables, setPoolTables] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPoolTables = async () => {
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

  useEffect(() => {
    fetchPoolTables();
  }, []);

  return { poolTables, loading };
};

export default useFetchPoolTables;
