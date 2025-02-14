import React, {useEffect, useState} from 'react';

import WeatherCardList from "../weathercardlist/WeatherCardList.jsx";
import fetchWeather from "../weather/weather.jsx";
import CalculateWeightedScore from "../../helpers/CalculateWeightedScore.jsx";


function SavedLocationList({ onWeatherDataFetched, onError }) {
    const [locationList] = useState(() => {
        const storedLocations = localStorage.getItem("locations");
        return storedLocations ? JSON.parse(storedLocations) : [];
    });

    const [locationListWeatherData, setLocationListWeatherData] = useState([]);
    const [error, setError] = useState(null);

    let preferences = { preferredWeather: { temperature: 0, cloudiness: 0, windspeed: 0 } };
    const storedPreferences = localStorage.getItem("preferences");
    if (storedPreferences && storedPreferences !== "undefined") {
        try {
            preferences = JSON.parse(storedPreferences);
        } catch (err) {
            console.error("Fout bij het parsen van preferences uit localStorage:", err);
        }
    }

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                console.log("Locatielijst:", locationList);
                const weatherData = await Promise.all(
                    locationList.map(async (place) => {
                        console.log("Ophalen gegevens voor:", place.location);
                        const data = await fetchWeather(place.location);
                        const weightedScore = CalculateWeightedScore(data, preferences.preferredWeather);
                        return { ...data, score: weightedScore };
                    })
                );

                weatherData.sort((a, b) => b.score - a.score);
                setLocationListWeatherData(weatherData);

                if (onWeatherDataFetched) {
                    onWeatherDataFetched(weatherData);
                }
                console.log("Weerdata succesvol opgehaald:", weatherData);
            } catch (err) {
                console.error("Fout bij ophalen van gegevens:", err.message);
                setError("Er is een probleem met het ophalen van gegevens. Probeer het later opnieuw.");
                if (onError) {
                    onError(err.message);
                }
            }
        };
        fetchWeatherData();
    }, [locationList, onWeatherDataFetched, onError]);

    if (error) {
        return <span><p>{error}</p></span>;
    }

    return <WeatherCardList weatherData={locationListWeatherData} />;
}

export default SavedLocationList;
