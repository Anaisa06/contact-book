import React, { useState } from 'react'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { readPhoneContacts, savePhoneContacts } from '../services/contactsServices';
import { IUser } from '../interfaces/userInterface';
import { SettingsRoute } from '../navigate/routesTypes';
import { useNavigation } from '@react-navigation/native';
import { SettingsNavigationProp } from '../navigate/navigationTypes';

interface IProps {
    route: SettingsRoute;
}

const SettingsScreen = ({ route }: IProps) => {

    const navigation = useNavigation<SettingsNavigationProp>();

    const [loading, setIsLoading] = useState(false);
    const [modalText, setModalText] = useState('Sincronizar con agenda de contactos')

    const {user} = route.params;

    const handleSyncPress = async () => {
        setIsLoading(true)
        setModalText('Sincronizando')
    
        try {
    
          const phoneContactsList = await readPhoneContacts();
          if (!phoneContactsList) return;
    
          const savedPhoneContacts = await savePhoneContacts(phoneContactsList, user);  
          console.log(savedPhoneContacts);
          
        } catch (error) {
          console.error('Error in handle sync', error);
    
        } finally {
          setIsLoading(false)
          navigation.navigate('AllContacts')          
        }
      }

  return (
  <>
    <TouchableOpacity  activeOpacity={0.8} style={{ margin: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#AAA1C8', padding: 10, borderRadius: 8 }} onPress={loading ? undefined : handleSyncPress}>
    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}> {modalText}</Text>
  </TouchableOpacity>
    {
      loading &&
      <ActivityIndicator size={'large'}/>
    }
  </>
  )
}

export default SettingsScreen