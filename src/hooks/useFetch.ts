import { useState, useEffect } from 'react';

const useFetch = (serviceFunction: () => Promise<any>, dependencies: any[] = []) => {
    const [data, setData] = useState<any | null>([]);

    async function fetchData() {
        try {
            const result = await serviceFunction();
            setData(result);
        } catch (error) {
            console.error(error);
        }
    }
    
    // useEffect(() => {
    //     fetchData();
    // }, dependencies);

    fetchData()
    

    return {data, refetch: fetchData};
};

export default useFetch;