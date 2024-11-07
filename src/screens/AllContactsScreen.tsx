import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { FlatList, SectionList, Text, View } from "react-native";
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
import useAllContacts from "../hooks/AllContacts/useAllContacts";


const AllContactsScreen = () => {

  const navigation = useNavigation<HomeNavigationProp>();
  
  const { control } = useForm();

  const watchedText = useWatch({
    control,
    name: 'name',
  })

  const data = useAllContacts(watchedText)

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
            <SectionList  
            sections={data} 
            keyExtractor={(item, index) => item.id + index} 
            renderItem={({ item }) => <CardComponent contact={item} handlePress={() => navigation.navigate('SingleContact', { contact: item })} />} 
            renderSectionHeader={({section: {title}}) => (
              <Text style={{fontSize: 30, color: '#967AA1', paddingHorizontal: 20}}>{title}</Text>
            )}
            />
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

