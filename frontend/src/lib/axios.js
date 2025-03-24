import axios from 'axios';

// Set default base URL for all axios requests
axios.defaults.baseURL = import.meta.env.VITE_SERVER;

// Set default credentials option
axios.defaults.withCredentials = true;

export default axios; 