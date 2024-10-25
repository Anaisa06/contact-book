import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"
import ContactForm from "../components/AddContacts/form";

const AddContactScreen = () => {

    return (
        <SafeAreaProvider>
            <SafeAreaView>

            <ContactForm/>
                
            </SafeAreaView>
        </SafeAreaProvider>


    )
}

export default AddContactScreen