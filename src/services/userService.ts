import { apiAxiosInstance } from "../config/axiosConfig";
import { IUser } from "../interfaces/userInterface";

export const updateUser = async(user: IUser) => {
    const {data} = await apiAxiosInstance.patch(`users/${user.id}`, user);
    return data;
}