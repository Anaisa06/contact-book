import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiAxiosInstance } from "../../config/axiosConfig";
import { ILogin } from "../../interfaces/loginInterface";
import { IRegister } from "../../interfaces/registerInterface";
import { IUser } from "../../interfaces/userInterface";

export const LoginService = async (loginData: ILogin) => {

        const {data} = await apiAxiosInstance.post('auth/login', loginData);
        console.log(data.data.token);
        if(data.statusCode === 201) {
            await setToken(data.data.token);
            await setUser(data.data.user);
        }
        return data;
}

export const RegisterService = async (registerData:IRegister ) => {

        const {data} = await apiAxiosInstance.post('auth/register', registerData);
        return data;

}

export const setToken = async (token: string) => {
    try {
        await AsyncStorage.setItem('token', token);
    } catch (error) {
        console.error('Error setting token', error)
    }
}

export const setUser = async (user: IUser) => {
    try {
        const formattedUser = JSON.stringify(user);
        await AsyncStorage.setItem('user', formattedUser)
    } catch (error) {
        console.error('Error setting user', error);
    }
}

export const getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : undefined;
}

export const getToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if(!token) return false;
        return true;
}

export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
    } catch (error) {
        console.error('Error in logout', error)
    }
}