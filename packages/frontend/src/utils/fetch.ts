import axios from 'axios';

const fetch = axios.create({
  baseURL: 'https://localhost:3001/',
  timeout: 1000,
});

export default fetch;
