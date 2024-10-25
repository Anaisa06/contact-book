import { useNavigation } from "@react-navigation/native";
import { Button, FlatList, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { HomeNavigationProp } from "../navigate/navigationTypes";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'
import CardComponent from "../components/AllContacts/CardComponent";
import AddBtnComponent from "../components/AllContacts/AddBtnComponent";
import { IContact } from "../interfaces/contactInterface";
import useFetch from "../hooks/useFetch";
import { getContacts } from "../services/contactsServices";

// const data: IContact[] = [
//   { id: '1', name: 'Ana', phoneNumber: '3044740821', email: 'example@gmail.com' },
//   { id: '2', name: 'Fore', phoneNumber: '30123423534', email: 'example@gmail.com'},
//   { id: '3', name: 'Dani', phoneNumber: '31205392343', email: 'example@gmail.com'},
//   { id: '4', name: 'Ana', phoneNumber: '3044740821', email: 'example@gmail.com' },
//   { id: '5', name: 'Fore', phoneNumber: '30123423534', email: 'example@gmail.com' },
//   { id: '6', name: 'Dani', phoneNumber: '31205392343', email: 'example@gmail.com' },
// ]


const AllContactsScreen = () => {

  const navigation = useNavigation<HomeNavigationProp>();

  const data: IContact[] = useFetch(getContacts);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{height: '100%'}}>
    {
      data.length > 0 
      ? <FlatList data={data} keyExtractor={item => item.id} renderItem={({ item }) => <CardComponent id={item.id} name={item.name} number={item.phoneNumber} email={item.email} handlePress={() => navigation.navigate('SingleContact', {contact: item})} />}  />
      : <Text>No se encontraron contactos</Text>
    }
        
        <AddBtnComponent handlePress={() => navigation.navigate('AddContact')}/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


export default AllContactsScreen;

