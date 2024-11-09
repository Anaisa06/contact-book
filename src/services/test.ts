import { apiAxiosInstance } from "../config/axiosConfig";

export const ApiTest = async () => {
    try {
        const {data} = await apiAxiosInstance.get('users');
        console.log(data); 
    } catch (error) {
        console.error('Error in test', error);
    }
}