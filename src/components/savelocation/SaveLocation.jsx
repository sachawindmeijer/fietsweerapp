import React, {useState, useEffect, useContext} from "react";
import "./SaveLocation.css"



import LocationList from "../locationlist/LocationList.jsx";
import LocationForm from "../locationform/LocationForm.jsx";


function SaveLocation({
                          fetchWeather,
                          maxLocations = 3,
                          onError = (message) => console.error(message),

                      }) {

    const [locationList, setLocationList] = useState(() => {
        try {
            const storedLocations = localStorage.getItem('locations');
            return storedLocations ? JSON.parse(storedLocations) : [];
        } catch (e) {
            console.error('Fout bij het uitlezen van locations uit localStorage:', e);
            return [];
        }
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const addLocation = async (location) => {
        if (locationList.length >= maxLocations) {
            setError(`Het maximum aantal van ${maxLocations} locaties is bereikt.`);
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
                setError('De locatie is niet gevonden. Controleer de spelling.');
            }
        } catch (error) {
            setError('Er is een probleem met het ophalen van gegevens. Probeer het later opnieuw.');
            onError(error.message || 'Onbekende fout');
        } finally {
            setLoading(false);
        }
    };

    const deleteLocation = (id) => {
        const updatedList = locationList.filter((loc) => loc.id !== id);
        setLocationList(updatedList);
    };

    useEffect(() => {
        try {
            localStorage.setItem('locations', JSON.stringify(locationList));
        } catch (error) {
            console.error('Fout bij het opslaan in localStorage:', error);
        }
    }, [locationList]);

    return (
        <section className="outer-container">
           {/*<form>*/}
            <h4>Pas jouw voorkeuren hier aan</h4>
            <div className="form-savelocation-container">
            <LocationForm onAddLocation={addLocation} error={error} loading={loading} />
                {locationList.length === 0 && (
                    <p className="warning" >
                        Voer ten minste één locatie in.
                    </p>
                )}

            <LocationList locations={locationList} onDeleteLocation={deleteLocation} />
            </div>
           {/*</form>*/}
        </section>
    );
}

export default SaveLocation;