import axios from 'axios';

const request = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : 'http://guowei.fun:3000',
});

export default request;