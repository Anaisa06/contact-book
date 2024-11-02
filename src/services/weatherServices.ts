import { LatLng } from "react-native-maps";
import weatherAxiosInstance from "../config/axiosConfig";

const ApiKey = process.env.OPEN_WEATHER_API_KEY;

export const getWeather = async (location: LatLng) => {
    try {
        const {data} = await weatherAxiosInstance.get(`?lat=${location.latitude}&lon=${location.longitude}&appid=${ApiKey}&units=metric&lang=es`);
        console.log(data);
    } catch (error) {
        console.log('Error in get weather', error)
    }
}