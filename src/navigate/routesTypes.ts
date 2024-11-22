import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./navigationTypes";

export type AllContactsRoute = RouteProp<RootStackParamList, 'AllContacts'>;
export type SingleContactRoute = RouteProp<RootStackParamList, 'SingleContact'>;
export type UpdateContactRoute = RouteProp<RootStackParamList, 'UpdateContact'>;
export type SettingsRoute = RouteProp<RootStackParamList, 'Settings'>;