import axios from 'axios';

const axioCreate = axios.create({
  baseURL: 'http://localhost:8000/api', // Update the base URL accordingly
});

// Define your Axios API functions
const getPoolTables = () => axioCreate.get('/pooltables/');
const getPoolTableDetails = (id) => axioCreate.get(`/pooltables/${id}/`);
const getPoolTablesByLocation = (location) =>
  axioCreate.get(`/pooltables?location=${location}`);

export { getPoolTables, getPoolTableDetails, getPoolTablesByLocation };
