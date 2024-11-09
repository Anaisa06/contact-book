import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RegisterForm from "../components/Register/registerForm";

const RegisterScreen = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <RegisterForm />

            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default RegisterScreen;