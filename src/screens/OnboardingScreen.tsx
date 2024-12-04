import React from 'react'
import { Image, SafeAreaView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Onboarding from 'react-native-onboarding-swiper';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { OnboardingNavigationProp } from '../navigate/navigationTypes';
import { getUser } from '../services/auth/authServices';
import { updateUser } from '../services/userService';


const OnboardingScreen = () => {

    const navigation = useNavigation<OnboardingNavigationProp>();

    const handleDone = async () => {
        try {

            const user = await getUser();
            await updateUser({
                ...user,
                onboarding: true
            })

            navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'AllContacts' }],
                })
              );
        } catch (error) {
            console.error('Error in handle done onboarding', error)
        }
    }

  return (
    <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 }}>
        <Onboarding
        onDone={handleDone}
        pages={[
            {
                backgroundColor: '#D5C6E0',
                title: 'Bienvenido a CloseToYou',
                subtitle: 'Toda la información de tus contactos, en un solo lugar',
                titleStyles: { fontSize: 24, fontWeight: 'bold', color: '#333' },
                subTitleStyles: { fontSize: 16, color: '#171414', textAlign: 'center' },
                image: <Image source={require('../assets/appImages/CloseToYouLogo.jpg')} 
                style={{ width: '90%', height: 300, resizeMode: 'contain' }}/>
            },
            {
                backgroundColor: '#967AA1',
                title: 'Primeros pasos',
                subtitle: 'Añade tus nuevos contactos con el botón de la parte inferior',
                titleStyles: { fontSize: 24, fontWeight: 'bold', color: '#333' },
                subTitleStyles: { fontSize: 16, color: '#171414', textAlign: 'center' },
                image: <Image source={require('../assets/appImages/NoContacts.jpg')} 
                style={{ width: 400, height: 500, resizeMode: 'contain' }}/>
            },
            {
                backgroundColor: '#AAA1C8',
                title: 'Lista de contactos',
                subtitle: 'En esta pantalla podrás ver todos tus contactos. Si tocas en la tarjeta del contacto, podrás ver todos los detalles. También, en la parte superior, puedes cerras tu sesión o ir a los ajustes',
                titleStyles: { fontSize: 24, fontWeight: 'bold', color: '#333' },
                subTitleStyles: { fontSize: 16, color: '#171414', textAlign: 'center' },
                image: <Image source={require('../assets/appImages/AllContacts.jpg')} 
                style={{ width: 400, height: 500, resizeMode: 'contain' }}/>
            },
            {
                backgroundColor: '#F5E6E8',
                title: 'Detalles del contacto',
                subtitle: 'En esta pantalla podrás ver los detalles del contacto, así como editar y eliminar',
                titleStyles: { fontSize: 24, fontWeight: 'bold', color: '#333' },
                subTitleStyles: { fontSize: 16, color: '#171414', textAlign: 'center' },
                image: <Image source={require('../assets/appImages/SingleContact.jpg')} 
                style={{ width: 400, height: 500, resizeMode: 'contain' }}/>
            },
            {
                backgroundColor: '#D5C6E0',
                title: 'Ajustes',
                subtitle: 'En esta pantalla puedes sincronizar la lista de contactos de tu teléfono con la aplicación',
                titleStyles: { fontSize: 24, fontWeight: 'bold', color: '#333' },
                subTitleStyles: { fontSize: 16, color: '#171414', textAlign: 'center' },
                image: <Image source={require('../assets/appImages/Settings.jpg')} 
                style={{ width: 400, height: 500, resizeMode: 'contain' }}/>
            }
        ]}
        />


    </SafeAreaView >
</SafeAreaProvider>
  )
}

export default OnboardingScreen