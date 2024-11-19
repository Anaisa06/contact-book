import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { getContacts } from "../../services/contactsServices";
import useFetch from "../useFetch";
import useDebouncer from "../useDebouncer";
import { IContact } from "../../interfaces/contactInterface";
import { getUser } from "../../services/auth/authServices";
import { IUser } from "../../interfaces/userInterface";

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

const useAllContacts = (watchedText: string) => {
  
  
    const [user, setUser] = useState<IUser | null>(null)
    const [contacts, setContacts] = useState<IContact[]>([]);
  async function fetchData() {
    try {
        const user: IUser = await getUser();
        setUser(user);
        const contacts = await getContacts(user);
        setContacts(contacts);
    } catch (error) {
        console.error(error);
    }
}


    useFocusEffect(
        useCallback(() => {
          fetchData()
        }, [])
      )

    const filteredData = useDebouncer(contacts, watchedText);

    const groupedData = groupContactsByLetter(filteredData.length ? filteredData : contacts);
 
    return {
      groupedData,
      user: user 
    }
};

export default useAllContacts;