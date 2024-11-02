import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IContact } from "../interfaces/contactInterface";
import { LatLng } from "react-native-maps";

export type RootStackParamList = {
    AllContacts: undefined;
    AddContact: undefined;
    SingleContact: { contact: IContact };
    UpdateContact: { contact: IContact };
    Map: { location?: LatLng, setLocation: React.Dispatch<React.SetStateAction<LatLng>>};
  }

export type AddContactNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddContact'>;

export type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AllContacts'>;

export type SingleContactNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SingleContact'>;

export type UpdateContactNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UpdateContact'>;



