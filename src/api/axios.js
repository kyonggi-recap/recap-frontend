import axios from 'axios';

const token = document.cookie.replace(
  /(?:^|; )accessToken=([^;]*);?/,
  '$1'
);

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
