import { LatLng } from "react-native-maps";
import { Role } from "./rolesEnum";

export interface IContact {
    id?: string;
    name: string;
    email?: string;
    phoneNumber?: string;
    imageUri?: string;
    location?: LatLng;
    latitude?: string;
    longitude?: string;
    role?: Role;
}