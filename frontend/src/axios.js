// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:8000',
//   withCredentials: true,
// });

// export default api;


import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const csrfToken = Cookies.get('XSRF-TOKEN');
  const authToken = localStorage.getItem('token'); // Ambil dari localStorage

  if (csrfToken) {
    config.headers['X-XSRF-TOKEN'] = csrfToken;
  }

  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`;
  }

  return config;
});

export default api;
