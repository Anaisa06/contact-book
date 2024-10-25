import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"
import ContactForm from "../components/AddContacts/form";
import { UpdateContactRoute } from "../navigate/routesTypes";

interface Props {
    route: UpdateContactRoute;
}


const UpdateContactScreen = ({ route }: Props) => {
    const { contact } = route.params;

    return (
        <SafeAreaProvider>
            <SafeAreaView>

            <ContactForm contact={contact} />
                
            </SafeAreaView>
        </SafeAreaProvider>


    )
}

export default UpdateContactScreen