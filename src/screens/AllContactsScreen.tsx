import { useNavigation } from "@react-navigation/native";
import { SectionList, Text, View } from "react-native";
import { HomeNavigationProp } from "../navigate/navigationTypes";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import CardComponent from "../components/AllContacts/CardComponent";
import AddBtnComponent from "../components/AllContacts/AddBtnComponent";
import Inputfield from "../components/Atoms/InputField";
import { Controller, useForm, useWatch } from "react-hook-form";
import useAllContacts from "../hooks/AllContacts/useAllContacts";

const AllContactsScreen = () => {

  const navigation = useNavigation<HomeNavigationProp>();
  
  const { control } = useForm();

  const watchedText = useWatch({
    control,
    name: 'name',
  })

  const { groupedData, user }= useAllContacts(watchedText);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ height: '100%' }}>
        {
          groupedData.length > 0
            ? 
            <>
           <Controller name='name' control={control} defaultValue={''}  render={({ field }) => (
                        <Inputfield label='Buscar contacto por nombre o teléfono' field={field} />
                    )}
                    />
            <SectionList  
            sections={groupedData} 
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

