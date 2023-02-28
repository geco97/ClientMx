import axios from 'axios';

export default axios.create({
//    baseURL: `http://localhost:3000/v1/`,//YOUR_API_URL HERE
baseURL: `https://portalserver.maxitech.nu/v1/`,//YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  },
});
