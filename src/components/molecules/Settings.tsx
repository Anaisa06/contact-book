import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/FontAwesome'
import { HomeNavigationProp } from '../../navigate/navigationTypes'
import { IUser } from '../../interfaces/userInterface'


interface Props {

  navigation: HomeNavigationProp
}

const Settings = ({ navigation }: Props) => {



  return (
    <>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Settings')}>
        <Ionicons name="gear" size={25} color="black" />

      </TouchableOpacity>
{/* 
      <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.9} onPress={handlePress}>
        <Icon name='person-add' size={45} style={{color: '#D5C6E0'}}/>
    </TouchableOpacity> */}

    </>
  )
}

const styles = StyleSheet.create ({
  buttonContainer: {
      borderRadius: 50,
      height: 70,
      width: 70,
      overflow: 'hidden',
      backgroundColor: '#192A51',
      position: 'absolute',
      bottom: '5%',
      right: '5%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
  

  }
})

export default Settings;