import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"
import ContactForm from "../components/AddContacts/form";
import { useNavigation } from "@react-navigation/native";
import { AddContactNavigationProp } from "../navigate/navigationTypes";

const AddContactScreen = () => {

    const navigation = useNavigation<AddContactNavigationProp>();

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>

                <ContactForm navigator={navigation} />


            </SafeAreaView >
        </SafeAreaProvider>


    )
}

export default AddContactScreen