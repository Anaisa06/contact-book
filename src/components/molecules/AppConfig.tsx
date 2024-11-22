import React from 'react'
import { TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/FontAwesome'
import { removeToken } from '../../services/auth/authServices'
import { HomeNavigationProp } from '../../navigate/navigationTypes'
import { readPhoneContacts } from '../../services/contactsServices'

interface Props {
    navigation: HomeNavigationProp
}

const Logout = ({ navigation }: Props) => {



    const handleConfigPress = async () => {
        const phoneContactsList = await readPhoneContacts()
    }

  return (
    <TouchableOpacity onPress={() => handleConfigPress()}>
    <Ionicons name="gear" size={25} color="black" />
  </TouchableOpacity>
  )
}

export default Logout;