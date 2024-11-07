import { useEffect, useState } from "react";
import { IContact } from "../interfaces/contactInterface";

const useDebouncer = (data: IContact[], text: string) => {

    const [filteredData, setFilteredData] = useState<IContact[]>([])

    useEffect(() => {
        const changeHandler = setTimeout(() => {
          if (data) {
            const filteredData = data.filter((contact) => 
              contact.name.toLowerCase().includes(text.toLowerCase()) || 
              contact.phoneNumber.includes(text)   
            )
            setFilteredData(filteredData);
          }
        }, 1000);
        return () => {
          clearTimeout(changeHandler);
        }
      },[text, data]);

      return filteredData;
}

export default useDebouncer;