import { useNavigation } from "@react-navigation/native";
import { Button, FlatList, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { HomeNavigationProp } from "../navigate/navigationTypes";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'
import CardComponent from "../components/AllContacts/CardComponent";
import AddBtnComponent from "../components/AllContacts/AddBtnComponent";
import { IContact } from "../interfaces/contactInterface";

const data: IContact[] = [
  { id: '1', name: 'Ana', number: '3044740821', email: 'example@gmail.com' },
  { id: '2', name: 'Fore', number: '30123423534', email: 'example@gmail.com'},
  { id: '3', name: 'Dani', number: '31205392343', email: 'example@gmail.com'},
  { id: '4', name: 'Ana', number: '3044740821', email: 'example@gmail.com' },
  { id: '5', name: 'Fore', number: '30123423534', email: 'example@gmail.com' },
  { id: '6', name: 'Dani', number: '31205392343', email: 'example@gmail.com' },
]

const AllContactsScreen = () => {

  const navigation = useNavigation<HomeNavigationProp>();

  return (
    <SafeAreaProvider>
      <SafeAreaView >

        <FlatList data={data} keyExtractor={item => item.id} renderItem={({ item }) => <CardComponent id={item.id} name={item.name} number={item.number} email={item.email} handlePress={() => navigation.navigate('SingleContact', {contact: item})} />}  />
        <AddBtnComponent handlePress={() => navigation.navigate('AddContact')}/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


export default AllContactsScreen;

