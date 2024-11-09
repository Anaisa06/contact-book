import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { getContacts } from "../../services/contactsServices";
import useFetch from "../useFetch";
import useDebouncer from "../useDebouncer";
import { IContact } from "../../interfaces/contactInterface";

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
    let {data, refetch} = useFetch(getContacts);

    useFocusEffect(
        useCallback(() => {
          refetch()
        }, [])
      )

    const filteredData = useDebouncer(data, watchedText);
 
    return groupContactsByLetter(filteredData.length ? filteredData : data);
};

export default useAllContacts;