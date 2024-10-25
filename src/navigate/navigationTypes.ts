import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IContact } from "../interfaces/contactInterface";

export type RootStackParamList = {
    AllContacts: undefined;
    AddContact: undefined;
    SingleContact: { contact: IContact };
    UpdateContact: { contact: IContact };
  }

export type AddContactNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddContact'>;

export type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AllContacts'>;

export type SingleContactNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SingleContact'>;

export type UpdateContactNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UpdateContact'>;


