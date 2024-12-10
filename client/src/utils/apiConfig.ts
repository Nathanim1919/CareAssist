import axios from 'axios';

export const apiConfig = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});