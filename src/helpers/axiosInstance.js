import axios from 'axios';

const headers = {};

if (localStorage.getItem('idToken')) {
   headers.authorization = `Bearer ${localStorage.getItem('idToken')}`;
}

// const baseURL = 'http://localhost:5000' // local
const baseURL = 'https://shomin-arena.herokuapp.com' // heroku
// const baseURL = 'https://shomin-baackend-render.onrender.com/'; // render

//@ creating a axios instance with some basic configuration
export const axiosInstance = axios.create({
   baseURL,
});

//@ axios instance with auth token
export const axiAuth = axios.create({
   baseURL,
   headers,
});
