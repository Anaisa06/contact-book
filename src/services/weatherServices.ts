import { LatLng } from "react-native-maps";
import {weatherAxiosInstance} from "../config/axiosConfig";
import { IWeather } from "../interfaces/weatherInterface";

const ApiKey = process.env.OPEN_WEATHER_API_KEY;

export const getWeather = async (location: LatLng): Promise<IWeather | undefined> => {
    try {
        const {data} = await weatherAxiosInstance.get(`data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${ApiKey}&units=metric&lang=es`);

        return data;
    } catch (error) {
        console.log('Error in get weather', error)
    }
}