import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllContactsScreen from "../screens/AllContactsScreen";
import { RootStackParamList } from "./navigationTypes";
import SingleContactScreen from "../screens/SingleContactScreen";
import AddContactScreen from "../screens/AddContactScreen";
import UpdateContactScreen from "../screens/UpdateContactScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { getToken } from "../services/auth/authServices";

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const tokenExists = await getToken();

        setIsLoggedIn(tokenExists); 
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
    <Stack.Navigator initialRouteName={isLoggedIn ? 'AllContacts' : 'Login'}>
      <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown: false}} />
      <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name='AllContacts' component={AllContactsScreen} options={{ title: 'Mis contactos' }} />
      <Stack.Screen name='SingleContact' component={SingleContactScreen} options={{ title: 'Detalles del contacto' }} />
      <Stack.Screen name='AddContact' component={AddContactScreen} options={{ title: 'Nuevo contacto' }} />
      <Stack.Screen name='UpdateContact' component={UpdateContactScreen} options={{ title: 'Editar contacto' }} />

    </Stack.Navigator>
  )
}

export default StackNavigator;