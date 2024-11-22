import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const weatherApiUrl = 'https://api.openweathermap.org/';
const backApiUrl = 'http://143.198.186.60:3000/api/';

const weatherAxiosInstance = axios.create({
    baseURL: weatherApiUrl,
    timeout: 10000,
  });

  const apiAxiosInstance = axios.create({
    baseURL: backApiUrl,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
  },
  });


  apiAxiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
);

apiAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const customError = {
        message: error.response.data.message || 'Algo salió mal',
        status: error.response.status,
        
      };
      return Promise.reject(customError);
    } else if (error.request) {
      return Promise.reject({ message: 'No se recibió respuesta del servidor', status: 503 });
    } else {
      return Promise.reject({ message: 'Error en la solicitud', status: 500 });
    }
  }
)

export{ weatherAxiosInstance, apiAxiosInstance };