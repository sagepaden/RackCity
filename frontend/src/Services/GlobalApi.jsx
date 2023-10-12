import axios from 'axios';

const axioCreate = axios.create({
  baseURL: 'http://localhost:8000',
});

const getPoolTables = () => axioCreate.get('/pool_tables/');
const getPoolTableDetails = (id) => axioCreate.get(`/pool_tables/${id}/`);
// const getPoolTablesByLocation = (location) =>
//   axioCreate.get(`/pooltables?location=${location}`);

export { getPoolTables, getPoolTableDetails };
