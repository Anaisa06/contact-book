import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import confirmationAlert from "../../components/molecules/confirmationAlert";
import { IWeather } from "../../interfaces/weatherInterface";
import { SingleContactNavigationProp } from "../../navigate/navigationTypes";
import { deleteContacts } from "../../services/contactsServices";
import { getWeather } from "../../services/weatherServices";
import { IContact } from "../../interfaces/contactInterface";

export const useSingleContact = (contact: IContact) => {
    const [weather, setWeather] = useState<IWeather | undefined>(undefined)

    const navigation = useNavigation<SingleContactNavigationProp>();

    const location = {
        latitude:  Number (contact.latitude),
        longitude: Number (contact.longitude)
    }

    useEffect(() => {
        const fecthData = async () => {
            try {
                const data = await getWeather(location);
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

    return {
        handleUpdatePress,
        handleDeletePress,
        weather,
        location
    }
}