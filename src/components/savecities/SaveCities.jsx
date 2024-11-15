import React, {useState, useEffect, useContext} from "react";
import {CityContext} from "../../context/CityContext";
import "./SaveCities.css"
import Button from "../button/Button.jsx";

function SaveCities() {
    const [citiesList, setCitiesList] = useContext(CityContext)
    const [city, setCity] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city) {
            setError(false);
            let uniqueId = new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
            let newCity = {
                id: uniqueId,
                location: city,
            };
            console.log("Adding new city:", newCity)
            setCitiesList([newCity, ...citiesList]);
            setCity('')
        } else {
            setError(true)
            setCity('')
        }
    }
    const deleteCity = (id) => {
        let newCityList = citiesList.filter((city) => city.id !== id);
        console.log("Removing city:", id); // Log removed city ID
        setCitiesList([...newCityList])
    }

    useEffect(() => {
        localStorage.setItem('cities', JSON.stringify(citiesList));
        console.log("Cities saved to local storage"); // Log local storage update
    }, [citiesList])

    return (
        <section className="savecity-container">
            <h4>Pas jouw voorkeuren hier aan.</h4>
            <p>Opgeslagen steden: (max 3)</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={city}
                    className={error ? 'error' : 'city-input'}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Voer hier de stad in"
                />
                <Button
                    type="submit"
                    disabled={citiesList.length === 3}
                    text='Voeg stad toe'
                />
            </form>

            <section className="saved-cites-container">
                {citiesList.map((city) => {
                    const {id, location} = city;
                    return (
                        <article key={id} className="city-card">
                            <p className="stadnaam">{location}</p>
                            <button
                                type="button"
                                onClick={() => deleteCity(id)}
                                className="button"
                            >Verwijder de stad
                            </button>
                        </article>
                    )
                })}
            </section>
        </section>
    )
}

export default SaveCities