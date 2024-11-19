import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { SingleContactRoute } from "../navigate/routesTypes";
import { ImageContainer } from "../components/Atoms/ImageContainer";
import Icon from 'react-native-vector-icons/MaterialIcons'
import PhoneNumber from "../components/Atoms/PhoneNumber";
import Email from "../components/Atoms/Email";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { SingleContactNavigationProp } from "../navigate/navigationTypes";
import { IContact } from "../interfaces/contactInterface";
import confirmationAlert from "../components/molecules/confirmationAlert";
import { deleteContacts } from "../services/contactsServices";
import SubmitButton from "../components/Atoms/submitButton";
import { useEffect, useState } from "react";
import MapComponent from "../components/molecules/MapComponent";
import { IWeather } from "../interfaces/weatherInterface";
import { getWeather } from "../services/weatherServices";
import WeatherContainer from "../components/SingleContact/WeatherContainer";
import RoleContainer from "../components/Atoms/Role";

interface Props {
    route: SingleContactRoute;
}

const SingleContactScreen = ({ route }: Props) => {

    const [weather, setWeather] = useState<IWeather | undefined>(undefined)

    const navigation = useNavigation<SingleContactNavigationProp>();
    const { contact } = route.params;

    const defaultLocation = {
        latitude:  Number (contact.latitude),
        longitude: Number (contact.longitude)
    }

    useEffect(() => {
        const fecthData = async () => {
            try {
                const data = await getWeather(defaultLocation);
                setWeather(data)
            } catch (error) {
                console.error('Error getting weather', error);
            }
        }
        fecthData()
    }, [])

    const handleUpdatePress = () => {
        navigation.navigate('UpdateContact', { contact })
    }


    const handleDeletePress = async () => {

        const deleteFunction = async () => {
            await deleteContacts(contact);
            navigation.navigate('AllContacts')
        }

        try {
            const alertProps = {
                title: 'Eliminar contacto',
                text: `¿Estás segur@ que desear eliminar el contacto ${contact.name}?`,
                confirmFunction: deleteFunction
            }

            confirmationAlert(alertProps)
        } catch (error) {
            console.error('Error in handle delete press', error)
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <View style={styles.iconsContainer}>
                            <Icon name='edit' size={30} color={'#192A51'} onPress={handleUpdatePress} />
                            <Icon name='delete' size={30} color={'#653279'} onPress={handleDeletePress} />
                        </View>
                        <View style={styles.infoContainer}>
                            <ImageContainer uri={contact.imageUri} size={150} />
                            <Text style={styles.name}>{contact.name}</Text>
                            <PhoneNumber phoneNumber={contact.phoneNumber} iconSize={28} fontSize={20} />
                            <Email email={contact.email} iconSize={28} fontSize={20} />
                            {contact.role &&
                                <RoleContainer role={contact.role} iconSize={25} fontSize={20}/>
                            }
                        </View>
                        {weather &&
                            <WeatherContainer currentWeather={weather} />
                        }
                        <MapComponent location={defaultLocation} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    container: {
        width: '90%',
        height: '100%',
        padding: 10,
        margin: 20,
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 3,
        gap: 10

    },
    infoContainer: {
        width: '100%',
        padding: 20,
        margin: 20,
        alignSelf: 'center',
        display: 'flex',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    iconsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        justifyContent: 'flex-end'
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#474749'
    },

})

export default SingleContactScreen