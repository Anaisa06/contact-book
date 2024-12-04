import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllContactsScreen from "../screens/AllContactsScreen";
import { HomeNavigationProp, RootStackParamList } from "./navigationTypes";
import SingleContactScreen from "../screens/SingleContactScreen";
import AddContactScreen from "../screens/AddContactScreen";
import UpdateContactScreen from "../screens/UpdateContactScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import { useState, useEffect } from "react";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import { getToken, getUser } from "../services/auth/authServices";
import Ionicons from "react-native-vector-icons/Ionicons";
import Logout from "../components/molecules/Logout";
import { useNavigation } from "@react-navigation/native";
import Settings from "../components/molecules/Settings";
import { IUser } from "../interfaces/userInterface";
import SettingsScreen from "../screens/SettingsScreen";
import OnboardingScreen from "../screens/OnboardingScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {

  const navigation = useNavigation<HomeNavigationProp>();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const tokenExists = await getToken();
        const userLogged = await getUser();

        setIsLoggedIn(tokenExists); 
        setUser(userLogged);
      } catch (error) {
        console.log("Error reading token:", error);
      } finally {
        setIsLoading(false); 
      }
    };
    checkToken();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  return (
    <Stack.Navigator initialRouteName={
      isLoggedIn ? 
      user?.onboarding ?  'AllContacts': 'Onboarding'  
      : 'Login'
      }>
      <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown: false}} />
      <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name='AllContacts' component={AllContactsScreen} options={{ title: 'Mis contactos', headerRight: () => (
     <>
      <Logout navigation={navigation}/>
     </>
    ), }} />
      <Stack.Screen name='SingleContact' component={SingleContactScreen} options={{ title: 'Detalles del contacto' }} />
      <Stack.Screen name='AddContact' component={AddContactScreen} options={{ title: 'Nuevo contacto' }} />
      <Stack.Screen name='UpdateContact' component={UpdateContactScreen} options={{ title: 'Editar contacto' }} />
      <Stack.Screen name='Settings' component={SettingsScreen} options={{ title: 'Configuración' }} />
      <Stack.Screen name='Onboarding' component={OnboardingScreen} options={{headerShown: false}} />

    </Stack.Navigator>
  )
}

export default StackNavigator;