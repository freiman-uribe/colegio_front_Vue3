import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:8000/'
});
// async function Token() {
//     const response = await axios('http://localhost:8000/token/csrf')
//     console.log('🚀 ~ Token ~ response:', response)
//     return response.data

// }
// instance.interceptors.request.use(async function (config) {
//   const token = await Token();
//   if (token) {
//     config.headers['X-CSRF-TOKEN'] = token;
//   }
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });

export default instance

// import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:8000';

// async function getCsrfToken() {
//   const response = await axios.get('/sanctum/csrf-cookie');
//   return response.headers['set-cookie'];
// }

// axios.interceptors.request.use(async config => {
//   const token =  await getCsrfToken();
//   if (token) {
//     console.log('🚀 ~ token:', token)
//     // config.headers['X-CSRF-TOKEN'] = token.content;
//   }
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

// export default axios;