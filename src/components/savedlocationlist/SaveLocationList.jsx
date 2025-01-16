import React, {useContext, useEffect, useState} from 'react';

import { Link, useNavigate } from 'react-router-dom';
import {LocationContext} from "../../context/LocationContext.jsx";
import {PreferencesContext} from "../../context/PreferencesContext.jsx";
import {WeatherCardList} from "../weathercardlist/WeatherCardList.jsx";
import {fetchWeather} from "../weather/weather.jsx";
import CalculateWeightedScore from "../../helpers/CalculateWeightedScore.jsx";


function SavedLocationList() {
    const [locationList] = useContext(LocationContext);
    const [preferencesList] = useContext(PreferencesContext);

    const [locationListWeatherData, setLocationListWeatherData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                console.log("Locatielijst:", locationList);
                const weatherData = await Promise.all(
                    locationList.map(async (place) => {
                        console.log("Ophalen gegevens voor:", place.location);
                        const data = await fetchWeather(place.location);
                        const weightedScore = CalculateWeightedScore(data, preferencesList.preferredWeather);
                        return { ...data, score: weightedScore };
                    })
                );

                weatherData.sort((a, b) => b.score - a.score);
                setLocationListWeatherData(weatherData);
                console.log("Weerdata succesvol opgehaald:", weatherData);
            } catch (err) {
                console.error("Fout bij ophalen van gegevens:", err.message);
                setError("Er is een probleem met het ophalen van gegevens. Probeer het later opnieuw.");
            }
        };

        fetchWeatherData();
    }, [locationList, preferencesList]);

    if (error) {
        return <span className="weather-error"><p>{error}</p></span>;
    }

    return <WeatherCardList weatherData={locationListWeatherData} />;
}

export default SavedLocationList;
