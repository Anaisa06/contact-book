import axios from "axios";

const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const weatherAxiosInstance = axios.create({
    baseURL: weatherApiUrl,
    timeout: 1000,
  });

export default weatherAxiosInstance;