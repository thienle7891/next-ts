import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL + 'api';

const Http = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});
export default Http;
