import { LatLng } from "react-native-maps";
import { Role } from "./rolesEnum";

export interface IContact {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    image?: string;
    location?: LatLng;
    role?: Role;
}