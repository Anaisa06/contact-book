import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { FlatList, Text, View } from "react-native";
import { HomeNavigationProp } from "../navigate/navigationTypes";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import CardComponent from "../components/AllContacts/CardComponent";
import AddBtnComponent from "../components/AllContacts/AddBtnComponent";
import { IContact } from "../interfaces/contactInterface";
import useFetch from "../hooks/useFetch";
import { getContacts } from "../services/contactsServices";
import { useCallback, useEffect, useState } from "react";
import Inputfield from "../components/Atoms/InputField";
import { Controller, useForm, useWatch } from "react-hook-form";
import useDebouncer from "../hooks/useDebouncer";


const AllContactsScreen = () => {

  const navigation = useNavigation<HomeNavigationProp>();
  
  const {data, refetch} = useFetch(getContacts);

  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [])
  )
  
  const { control } = useForm();

  const watchedText = useWatch({
    control,
    name: 'name',
  })

  const filteredData = useDebouncer(data, watchedText);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ height: '100%' }}>
        {
          data.length > 0
            ? 
            <>
           <Controller name='name' control={control} defaultValue={''}  render={({ field }) => (
                        <Inputfield label='Buscar contacto por nombre o teléfono' field={field} />
                    )}
                    />
            <FlatList data={filteredData.length ? filteredData : data} keyExtractor={item => item.id} renderItem={({ item }) => <CardComponent contact={item} handlePress={() => navigation.navigate('SingleContact', { contact: item })} />} />
            </>
            : (<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'black', textAlign: 'center', margin: 20, fontSize: 20 }}>Aún no tienes contactos</Text>
            </View>)

        }

        <AddBtnComponent handlePress={() => navigation.navigate('AddContact')} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


export default AllContactsScreen;

