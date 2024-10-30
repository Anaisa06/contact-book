import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"
import ContactForm from "../components/AddContacts/form";
import { UpdateContactRoute } from "../navigate/routesTypes";
import { useNavigation } from "@react-navigation/native";
import { UpdateContactNavigationProp } from "../navigate/navigationTypes";

interface Props {
    route: UpdateContactRoute;
}


const UpdateContactScreen = ({ route }: Props) => {
    const { contact } = route.params;

    const navigation = useNavigation<UpdateContactNavigationProp>();

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>

            <ContactForm contact={contact} navigator={navigation} />
                
            </SafeAreaView>
        </SafeAreaProvider>


    )
}

export default UpdateContactScreen