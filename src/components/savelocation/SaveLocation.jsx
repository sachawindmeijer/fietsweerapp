import React, {useState, useEffect, useContext} from "react";
import {LocationContext} from "../../context/LocationContext.jsx";
import "./SaveLocation.css"

import {fetchWeather} from "../weather/weather.jsx";

import LocationList from "../locationlist/LocationList.jsx";
import LocationForm from "../locationform/LocationForm.jsx";


function SaveLocation() {
    const [locationList, setLocationList] = useContext(LocationContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const addLocation = async (location) => {
        if (locationList.length >= 3) {
            setError('Het maximum aantal van 3 locaties is bereikt.');
            return;
        }

        try {
            setLoading(true);
            setError('');
            const data = await fetchWeather(location);

            if (data?.name) {
                const uniqueId = `${Date.now().toString(36)}${new Date().getUTCMilliseconds()}`;
                const newLocation = { id: uniqueId, location: data.name };
                setLocationList([newLocation, ...locationList]);
            } else {
                setError('De locatie werd gevonden, maar de informatie is incompleet.');
            }
        } catch {
            setError('Er is een probleem met het ophalen van gegevens. Probeer het later opnieuw.');
        } finally {
            setLoading(false);
        }
    };
    const deleteLocation = (id) => {
        const updatedList = locationList.filter((loc) => loc.id !== id);
        setLocationList(updatedList);
    };

    useEffect(() => {
        // Opslaan in localStorage
        localStorage.setItem('locations', JSON.stringify(locationList));
    }, [locationList]);

    return (
        <section className="form-savelocation-container">
            <h4>Pas jouw voorkeuren hier aan.</h4>
            <LocationForm onAddLocation={addLocation} error={error} loading={loading} />
            <LocationList locations={locationList} onDeleteLocation={deleteLocation} />
        </section>
    );
}

export default SaveLocation;