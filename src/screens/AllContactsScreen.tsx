import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, SectionList, Text, View } from "react-native";
import { HomeNavigationProp } from "../navigate/navigationTypes";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import CardComponent from "../components/AllContacts/CardComponent";
import AddBtnComponent from "../components/AllContacts/AddBtnComponent";
import Inputfield from "../components/Atoms/InputField";
import { Controller, useForm, useWatch } from "react-hook-form";
import useAllContacts from "../hooks/AllContacts/useAllContacts";
import { IContact } from "../interfaces/contactInterface";

const AllContactsScreen = () => {

  const navigation = useNavigation<HomeNavigationProp>();

  const { control } = useForm();

  const watchedText = useWatch({
    control,
    name: 'name',
  })


  const { groupedData, user, handleLoadMore, isLoading, handlePressCard, handlePressAddBtn } = useAllContacts(watchedText, navigation);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ height: '100%' }}>

        
        {
          groupedData.length > 0
            ?
            <>
              <Controller name='name' control={control} defaultValue={''} render={({ field }) => (
                <Inputfield label='Buscar contacto por nombre o teléfono' field={field} />
              )}
              />
              <SectionList
                sections={groupedData}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => <CardComponent contact={item} handlePress={() => handlePressCard(item)} />}
                renderSectionHeader={({ section: { title } }) => (
                  <Text style={{ fontSize: 30, color: '#967AA1', paddingHorizontal: 20 }}>{title}</Text>
                )}
                onEndReachedThreshold={1}
                onEndReached={handleLoadMore}
                ListFooterComponent={() => isLoading ? <ActivityIndicator size="large" style={{ marginBottom: 20}}/> : null} 
              />
            </>
            : (<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'black', textAlign: 'center', margin: 20, fontSize: 20 }}>Aún no tienes contactos</Text>
            </View>)
        }
        <AddBtnComponent handlePress={handlePressAddBtn} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


export default AllContactsScreen;

