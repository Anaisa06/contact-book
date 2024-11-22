import React, { useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/FontAwesome'
import { removeToken } from '../../services/auth/authServices'
import { HomeNavigationProp } from '../../navigate/navigationTypes'
import { readPhoneContacts, savePhoneContacts } from '../../services/contactsServices'
import { IUser } from '../../interfaces/userInterface'
import ConfirmationModal from './confirmationModal'

interface Props {
  user: IUser | undefined;
  navigation: HomeNavigationProp
}

const Settings = ({ user, navigation }: Props) => {

  const [settingsModal, setSettingsModal] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [modalText, setModalText] = useState('Sincronizar con agenda de contactos')


  if (!user) return;

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
      setModalText('Sincronizar con agenda de contactos')
      setSettingsModal(false);
    }
  }



  return (
    <>
      <TouchableOpacity style={{ margin: 10 }} onPress={() => navigation.navigate('Settings', { user })}>
        <Ionicons name="gear" size={25} color="black" />
      </TouchableOpacity>
      {/* <ConfirmationModal hasButton={!loading} openModal={settingsModal} onClose={() => setSettingsModal(false)}>
        <TouchableOpacity  activeOpacity={0.8} style={{ margin: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#AAA1C8', padding: 10, borderRadius: 8 }} onPress={loading ? undefined : handleSyncPress}>
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}> {modalText}</Text>
        </TouchableOpacity>
          {
            loading &&
            <ActivityIndicator size={'large'}/>
          }
        
      </ConfirmationModal> */}
    </>
  )
}

export default Settings;