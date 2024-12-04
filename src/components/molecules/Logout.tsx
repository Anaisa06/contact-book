import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { removeToken } from '../../services/auth/authServices'
import { HomeNavigationProp } from '../../navigate/navigationTypes'
import { CommonActions } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'

interface Props {
  navigation: HomeNavigationProp
}

const Logout = ({ navigation }: Props) => {

  const handleLogout = async () => {
    await removeToken();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  }
  
  return (
    <View style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>
      <TouchableOpacity onPress={() => handleLogout()}>
        <Ionicons name="log-out-outline" size={25} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Icon name="gear" size={25} color="black" />

      </TouchableOpacity>
    </View>
  )
}

export default Logout;