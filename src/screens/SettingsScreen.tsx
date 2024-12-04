import React, { useState } from 'react'
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native'
import { readPhoneContacts, savePhoneContacts } from '../services/contactsServices';
import { IUser } from '../interfaces/userInterface';
import { SettingsRoute } from '../navigate/routesTypes';
import { useNavigation } from '@react-navigation/native';
import { SettingsNavigationProp } from '../navigate/navigationTypes';
import ConfirmationModal from '../components/molecules/confirmationModal';
import { updateUser } from '../services/userService';
import { getUser, setUser } from '../services/auth/authServices';

interface IProps {
  route: SettingsRoute;
}

const SettingsScreen = ({ route }: IProps) => {

  const navigation = useNavigation<SettingsNavigationProp>();


  const [loading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [user, setCurrentUser] = useState<IUser | undefined>(undefined);

  
  const handleSyncPress = async () => {
    setIsLoading(true)
    setOpenModal(true)
    
    try {
      const user = await getUser();
      setCurrentUser(user);


      const phoneContactsList = await readPhoneContacts();
      if (!phoneContactsList) return;

      const savedPhoneContacts = await savePhoneContacts(phoneContactsList, user);
      console.log(savedPhoneContacts);

      if (savedPhoneContacts) {
        await setUser({
          ...user,
          syncronization: true
        })
        await updateUser({
          ...user,
          syncronization: true
        })
      }

    } catch (error) {
      console.error('Error in handle sync', error);

    } finally {
      setOpenModal(false)
      setIsLoading(false)
      navigation.navigate('AllContacts')
    }
  }

  return (
    <View style={{ padding: 10, display: 'flex', height: '100%', justifyContent: 'center', backgroundColor: 'white' }}>
      <TouchableOpacity activeOpacity={0.8} style={{ margin: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#AAA1C8', padding: 10, borderRadius: 8, flexDirection: 'row' }} onPress={user?.syncronization ? undefined : handleSyncPress}>
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}> {user?.syncronization ? 'Contactos ya sincronizados' : 'Sincronizar con agenda de contactos'}</Text>

      </TouchableOpacity>

      <ConfirmationModal hasButton={!loading} openModal={openModal} onClose={() => setOpenModal(false)} text='Sincronizando' >
        <ActivityIndicator size={'large'} />
      </ConfirmationModal>

      <TouchableOpacity activeOpacity={0.8} style={{ margin: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#AAA1C8', padding: 10, borderRadius: 8 }} >
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}> Cambiar tema</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8} style={{ margin: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#AAA1C8', padding: 10, borderRadius: 8 }} >
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}> Editar información de perfil</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SettingsScreen