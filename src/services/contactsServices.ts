import AsyncStorage from '@react-native-async-storage/async-storage';
import { IContact } from '../interfaces/contactInterface';
import { Icon } from 'react-native-vector-icons/Icon';

export const saveContact = async (contact: IContact[]) => {
    try {
        const jsonContact = JSON.stringify(contact)
        await AsyncStorage.setItem('contacts', jsonContact);
      } catch (error) {
        console.error('Error saving contact', error)
      }
}

export const getContacts = async (): Promise<IContact[]> => {
    try {
        const contacts = await AsyncStorage.getItem('contacts');
        return contacts != null ? JSON.parse(contacts) : [];
      } catch (error) {
        console.error('Error getting contacts', error);
        return [];
      }
}