import { useState, useEffect } from 'react';

const useFetch = (serviceFunction: () => Promise<any>, dependencies: any[] = []) => {
    const [data, setData] = useState<any | null>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await serviceFunction();
                setData(result);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, dependencies);

    return data;
};

export default useFetch;