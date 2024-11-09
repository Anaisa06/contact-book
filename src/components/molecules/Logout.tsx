import React from 'react'
import { TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { removeToken } from '../../services/auth/authServices'
import { HomeNavigationProp } from '../../navigate/navigationTypes'

interface Props {
    navigation: HomeNavigationProp
}

const Logout = ({ navigation }: Props) => {



    const handleLogout = async () => {
        await removeToken();
        navigation.navigate('Login');
    }
  return (
    <TouchableOpacity onPress={() => handleLogout()}>
    <Ionicons name="log-out-outline" size={25} color="black" />
  </TouchableOpacity>
  )
}

export default Logout;