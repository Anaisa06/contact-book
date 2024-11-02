import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllContactsScreen from "../screens/AllContactsScreen";
import { RootStackParamList } from "./navigationTypes";
import SingleContactScreen from "../screens/SingleContactScreen";
import AddContactScreen from "../screens/AddContactScreen";
import UpdateContactScreen from "../screens/UpdateContactScreen";
import MapModal from "../screens/MapModal";



const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='AllContacts'>
      <Stack.Screen
        name='AllContacts'
        component={AllContactsScreen}
        options={{
          title: 'Mis contactos'
        }} />
      <Stack.Screen name='SingleContact' component={SingleContactScreen} options={{ title: 'Detalles del contacto' }} />
      <Stack.Screen name='AddContact' component={AddContactScreen} options={{ title: 'Nuevo contacto' }} />
      <Stack.Screen name='UpdateContact' component={UpdateContactScreen} options={{ title: 'Editar contacto' }} />
      {/* <Stack.Screen name='Map' component={MapScreen} options={{ title: 'Mapa'}} /> */}

    </Stack.Navigator>
  )
}

export default StackNavigator;