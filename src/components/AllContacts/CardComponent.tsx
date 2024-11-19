import { View, Text, StyleSheet, Image, Pressable } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ImageContainer } from "../Atoms/ImageContainer";
import PhoneNumber from "../Atoms/PhoneNumber";
import Email from "../Atoms/Email";
import { IContact } from "../../interfaces/contactInterface";

interface ItemProps { 
    contact: IContact;
    handlePress: () => void;
};

const CardComponent = ({ contact, handlePress }: ItemProps) => {
    return (
        <Pressable style={styles.contactCard} onPress={handlePress}  >
            <ImageContainer uri={contact.imageUri}/>
            <View style={styles.infoContainer}>
                <Text style={styles.name} >{contact.name}</Text>
                <PhoneNumber phoneNumber={contact.phoneNumber} iconSize={25} fontSize={17}/>
                <Email email={contact.email} fontSize={17} iconSize={25} />

            </View>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    contactCard: {
        height: 150,
        padding: 20,
        borderRadius: 8,
        backgroundColor: 'white',
        elevation: 3,
        marginBottom: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    infoContainer: {
        borderRadius: 8,
        height: '100%',
        width: '70%',
        padding: 10,
        display: 'flex',
        gap: 10,
        justifyContent: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#474749'
    },
    seeContact: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    blackText: {
        color: '#967AA1'
    }
})


export default CardComponent