import { LatLng } from "react-native-maps";

export interface IContact {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    image?: string;
    location?: LatLng;
}