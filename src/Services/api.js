import axios from 'axios';

const API = axios.create({
  baseURL: 'https://final-lms-project.onrender.com/api'});

export default API;