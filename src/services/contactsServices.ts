import AsyncStorage from '@react-native-async-storage/async-storage';
import { IContact } from '../interfaces/contactInterface';
import { Icon } from 'react-native-vector-icons/Icon';
import { IUser } from '../interfaces/userInterface';
import { apiAxiosInstance } from '../config/axiosConfig';

export const saveContact = async (contact: IContact, user: IUser) => {
  const {data} = await apiAxiosInstance.post('contacts', {...contact, userId: user.id});
  return data;
}

export const getContacts = async (user: IUser): Promise<IContact[]> => {
  try {
    const { data } = await apiAxiosInstance.get(`contacts/user/${user.id}`);

    return data.data;
  } catch (error) {
    console.log(error);
    return []
  }
}

export const updateContact = async (contact: IContact) => {
  const { data } = await apiAxiosInstance.patch(`contacts/${contact.id}`, contact );
  console.log(data)
}


export const deleteContacts = async (contact: IContact) => {
  const {data} = await apiAxiosInstance.delete(`contacts/${contact.id}`);
  return data;
}

export const removeAllContacts = async () => {
  try {
    await AsyncStorage.removeItem('contacts');
  } catch (error) {
    console.error('Error deleting contacts', error);
  }
}