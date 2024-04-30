import { createContext, useEffect, useState } from 'react';

export const CityContext = createContext(null)
function CitycontextProvider({ children }) {
    const [citiesList, setCitiesList] = useState([]);



        useEffect(() => {
            const storedCities = localStorage.getItem('cities');
            const parsedCities = storedCities ? JSON.parse(storedCities) : [];

            setCitiesList(parsedCities);
        }, []);


    //     const citiesList=JSON.parse(localStorage.getItem('cities'));
    //     if (citiesList){
    //         setCitieslist(citiesList);
    //     }
    // }, []);

    return (
        <CityContext.Provider value={[citiesList, setCitiesList]}>
            {children}
        </CityContext.Provider>
    )
}

export default CitycontextProvider