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

// Tambahkan CSRF token ke header
api.interceptors.request.use(config => {
  const token = Cookies.get('XSRF-TOKEN');
  if (token) {
    config.headers['X-XSRF-TOKEN'] = token;
  }
  return config;
});

export default api;
