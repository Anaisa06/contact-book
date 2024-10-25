import { StyleSheet, Text, View } from "react-native";
import { SingleContactRoute } from "../navigate/routesTypes";
import { ImageContainer } from "../components/Atoms/ImageContainer";
import Icon from 'react-native-vector-icons/MaterialIcons'
import PhoneNumber from "../components/Atoms/PhoneNumber";
import Email from "../components/Atoms/Email";
import {  SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { SingleContactNavigationProp } from "../navigate/navigationTypes";

interface Props {
    route: SingleContactRoute;
}

const SingleContactScreen = ({ route }: Props) => {

    const navigation = useNavigation<SingleContactNavigationProp>();
    const { contact } = route.params;

    const handleUpdatePress = () => {
        navigation.navigate('UpdateContact', { contact })
    }

    return (
        <SafeAreaProvider>
        <SafeAreaView >
  

            <View style={styles.container}>
                <View style={styles.iconsContainer}>
                    <Icon name='edit' size={30} color={'#192A51'} onPress={handleUpdatePress}/>
                    <Icon name='delete' size={30} color={'#653279'} />
                </View>
                <View style={styles.infoContainer}>
                    <ImageContainer />

                    <Text style={styles.name}>{contact.name}</Text>
                    <PhoneNumber phoneNumber={contact.number} iconSize={28} fontSize={20} />
                    <Email email={contact.email} iconSize={28} fontSize={20} />
                </View>

            </View>

        </SafeAreaView>
        </SafeAreaProvider>

    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: '95%',
        padding: 20,
        margin: 20,
        alignSelf: 'center',
        display: 'flex',
        gap: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 3,

    },
    infoContainer: {
        width: '100%',

        padding: 20,
        margin: 20,
        alignSelf: 'center',
        display: 'flex',
        gap: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',

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