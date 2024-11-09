import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiAxiosInstance } from "../../config/axiosConfig";
import { ILogin } from "../../interfaces/loginInterface";
import { IRegister } from "../../interfaces/registerInterface";

export const LoginService = async (loginData: ILogin) => {

        const {data} = await apiAxiosInstance.post('auth/login', loginData);
        console.log('This is data from service', data);
        if(data.statusCode === 201) {
            setToken(data.data);
        }
        return data;
}

export const RegisterService = async (registerData:IRegister ) => {

        const {data} = await apiAxiosInstance.post('auth/register', registerData);
        console.log(data);
        return data;

}

export const setToken = async (token: string) => {
    try {
        await AsyncStorage.setItem('token', token);
    } catch (error) {
        console.error('Error setting token', error)
    }
}

export const getToken = async () => {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        if(!token) return false;
        return true;
}

export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('token');
    } catch (error) {
        console.error('Error in logout', error)
    }
}