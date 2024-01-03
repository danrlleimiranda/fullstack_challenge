import axios from 'axios';

const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:3001/';

const fetch = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export default fetch;
