// import React, { createContext, useState, useEffect } from "react";
//
// export const LocationContext = createContext(null);
//
// function LocationContextProvider({ children }) {
//     const [cityList, setCityList] = useState([]);
//
//     useEffect(() => {
//         const storedCities = JSON.parse(localStorage.getItem('cities'));
//         if (storedCities) {
//             setCityList(storedCities);
//         }
//     }, []);
//
//     return (
//         <LocationContext.Provider value={[cityList, setCityList]}>
//             {children}
//         </LocationContext.Provider>
//     );
// }
//
// export default LocationContextProvider;