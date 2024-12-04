import AsyncStorage from '@react-native-async-storage/async-storage';
import { IContact } from '../interfaces/contactInterface';
import { Icon } from 'react-native-vector-icons/Icon';
import { IUser } from '../interfaces/userInterface';
import { apiAxiosInstance } from '../config/axiosConfig';
import verifyPermissions from '../utlities/permissions';
import { PERMISSIONS } from 'react-native-permissions';
import Contacts from 'react-native-contacts';

interface IPaginatedContacts {
  contacts: IContact[] | [],
  total: number,
  page: number,
  limit: number,
  apiTotalPages: number,

}

export const saveContact = async (contact: IContact, user: IUser) => {
  const { data } = await apiAxiosInstance.post('contacts', { ...contact, userId: user.id });
  return data;
}

export const getContacts = async (user: IUser, limit: number, page: number): Promise<IPaginatedContacts> => {
  const { data } = await apiAxiosInstance.get(`contacts/user/${user.id}?page=${page}&limit=${limit}`);
  const contacts: IContact[] = data.data.contacts;

  console.log(data);

  return {
    contacts,
    total: data.data.total,
    page: Number(data.data.page),
    limit: Number(data.data.limit),
    apiTotalPages: data.data.totalPages
  };
}

export const updateContact = async (contact: IContact) => {
  const { data } = await apiAxiosInstance.patch(`contacts/${contact.id}`, contact);
  console.log(data)
}


export const deleteContacts = async (contact: IContact) => {
  const { data } = await apiAxiosInstance.delete(`contacts/${contact.id}`);
  return data;
}

export const removeAllContacts = async () => {
  try {
    await AsyncStorage.removeItem('contacts');
  } catch (error) {
    console.error('Error deleting contacts', error);
  }
}

export const readPhoneContacts = async () => {
  try {
    const permission = await verifyPermissions(PERMISSIONS.ANDROID.READ_CONTACTS)
    if (permission) {
      const phoneContacts = await Contacts.getAll();
      const phoneContactsList: IContact[] = phoneContacts.map(contact => {
        return {
          name: contact.displayName,
          email: contact.emailAddresses[0]?.email,
          phoneNumber: contact.phoneNumbers[0]?.number.trim()
        }
      })

      return phoneContactsList;
    }
  } catch (error) {
    console.error('Error getting phone contacts:', error);
  }
}

export const savePhoneContacts = async (contactsList: IContact[], user: IUser) => {
  try {
    const savedContacts: IContact[] =  await Promise.all(
      contactsList.map(async (contact) => {
        try {
          const savedContact = await saveContact({...contact, location: {latitude: 6.219129692661363, longitude: -75.58361012412955} }, user);
          return savedContact
          
        } catch (error) {
          console.error('error in map', error);
        }
      })
    )

    console.log(savedContacts);
    return savedContacts;

  } catch (error: any) {
    console.error('Error saving phone contacts', error);
  }
}