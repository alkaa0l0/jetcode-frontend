import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://f881897f73588c3206a912cc85000f33.serveo.net/api',
  timeout: 5000,
  headers: { 'X-Client-Id': '2334' }
});

export default instance;
