import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { Button, FlatList, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { HomeNavigationProp } from "../navigate/navigationTypes";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import CardComponent from "../components/AllContacts/CardComponent";
import AddBtnComponent from "../components/AllContacts/AddBtnComponent";
import { IContact } from "../interfaces/contactInterface";
import useFetch from "../hooks/useFetch";
import { getContacts } from "../services/contactsServices";
import { useCallback, useState } from "react";


const AllContactsScreen = () => {

  const isFocused = useIsFocused();

  const navigation = useNavigation<HomeNavigationProp>();

  const data: IContact[] = useFetch(getContacts, [isFocused]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ height: '100%' }}>
        {
          data.length > 0
            ? <FlatList data={data} keyExtractor={item => item.id} renderItem={({ item }) => <CardComponent contact={item} handlePress={() => navigation.navigate('SingleContact', { contact: item })} />} />
            : <Text style={{color: 'black', textAlign: 'center', margin: 20, fontSize: 20}}>Aún no tienes contactos</Text>
        }

        <AddBtnComponent handlePress={() => navigation.navigate('AddContact')} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


export default AllContactsScreen;

