import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { getContacts, readPhoneContacts } from "../../services/contactsServices";
import useFetch from "../useFetch";
import useDebouncer from "../useDebouncer";
import { IContact } from "../../interfaces/contactInterface";
import { getUser } from "../../services/auth/authServices";
import { IUser } from "../../interfaces/userInterface";
import { HomeNavigationProp } from "../../navigate/navigationTypes";

const groupContactsByLetter = (data: IContact[]) => {

  const grouped = data.reduce((result: any, contact: IContact) => {
    const firstLetter = contact.name[0].toUpperCase();
    if (!result[firstLetter]) {
      result[firstLetter] = [];
    }
    result[firstLetter].push(contact);
    return result;
  }, {});

  const groupedData = Object.keys(grouped).map((letter) => ({
    title: letter,
    data: grouped[letter].sort((a: IContact, b: IContact) => a.name.localeCompare(b.name)),
  }));

  return groupedData.sort((a, b) => a.title.localeCompare(b.title));
}

const getPhoneContacts = () => {

}

const useAllContacts = (watchedText: string, navigation: HomeNavigationProp) => {


  const [user, setUser] = useState<IUser | null>(null)
  const [contactsList, setContactsList] = useState<IContact[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  async function fetchData(page: number) {

    if (isLoading || page > totalPages) return;
    
    setIsLoading(true);
    
    try {
      
      const user: IUser = await getUser();
      setUser(user);
      
      const { contacts, total, apiTotalPages } = await getContacts(user, 200, page);      
      
      setContactsList((prevContacts) => [...prevContacts, ...contacts])
      
      setTotalPages(apiTotalPages);

    } catch (error: any) {
      console.error('error in useAllContacts fetchData', error);
      if (error.status === 404) {
        return {
          groupedData: []
        }
      };

    } finally {
      setIsLoading(false);
    }
  }

  const handleLoadMore = () => {
    if (currentPage < totalPages && !isLoading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData(currentPage)
    }, [currentPage])
  )

  const handlePressCard = (contact: IContact) => {
    setContactsList([]);
    setCurrentPage(1);
    navigation.navigate('SingleContact', { contact })
  }

  const handlePressAddBtn = async () => {
    setContactsList([]);
    setCurrentPage(1);
    navigation.navigate('AddContact');

  }

  const filteredData = useDebouncer(contactsList, watchedText);

  const groupedData = groupContactsByLetter(filteredData.length ? filteredData : contactsList);

  return {
    groupedData,
    user,
    handleLoadMore,
    isLoading,
    handlePressCard,
    handlePressAddBtn
  }
};

export default useAllContacts;