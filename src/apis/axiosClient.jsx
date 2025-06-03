import axios from "axios";
import queryString from "query-string";

const baseURL = "https://api.escuelajs.co/api/v1/";
const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: function(params) {
    return queryString.stringify(params);
  }
});

axiosClient.interceptors.request.use(function(config) {
  // Handle token here ...
  return config;
});

axiosClient.interceptors.response.use(
  function(response) {
    return response.data;
  },
  function(error) {
    // Handle errors
    console.log(error.message);
    throw error;
  }
);

export default axiosClient;