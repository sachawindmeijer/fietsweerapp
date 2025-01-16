import { useContext } from 'react';
import {LocationContext} from "../../context/LocationContext.jsx";


export const useLocations = () => {
    const [locationList, setLocationList] = useContext(LocationContext);

    const addLocation = (newLocation) => {
        setLocationList((prev) => [newLocation, ...prev]);
    };

    const deleteLocation = (id) => {
        setLocationList((prev) => prev.filter((loc) => loc.id !== id));
    };

    return { locationList, addLocation, deleteLocation };
};