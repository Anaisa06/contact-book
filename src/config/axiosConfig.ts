import axios from "axios";

const weatherApiUrl = 'https://api.openweathermap.org/';

const weatherAxiosInstance = axios.create({
    baseURL: weatherApiUrl,
    timeout: 10000,
  });

export default weatherAxiosInstance;