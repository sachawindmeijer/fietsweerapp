import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { PreferencesContext } from "../../context/PreferencesContext";
import { CityContext } from "../../context/CityContext.jsx";
import WeatherCard from "../weatherCard/WeatherCard";

function SavedCitiesList() {
    const [cityList] = useContext(CityContext);
    const [preferencesList] = useContext(PreferencesContext);
    const [cityListWeatherData, setCityListWeatherData] = useState([]);
    const [error, setError] = useState(null); // Use null for initial error state

    useEffect(() => {
        const fetchData = async () => {
            setError(null); // Reset error on each effect run

            try {
                const apiKey = import.meta.env.VITE_API_KEY ; // Of VITE_API_KEY afhankelijk van je setup
                if (!apiKey) {
                    console.error("API-key ontbreekt. Controleer je .env-bestand.");
                    setError(true);
                    return;
                }
                const cityWeatherPromises = cityList.map((city) =>
                    axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?q=${city.location},nl&appid=${apiKey}&lang=nl`
                    )
                );console.log("cityWeatherPromises:", cityWeatherPromises);

                const cityWeatherResponses = await Promise.all(cityWeatherPromises);
                console.log("cityWeatherResponses:", cityWeatherResponses);
                const processedData = cityWeatherResponses.map((response) => {
                    const { data } = response; // Destructure data directly
                    console.log("Weather data for", data.name, ":", data);

                    const weightedTemperature =
                        (data.main.temp / 100) * preferencesList.preferredWeather.temperature;
                    const weightedCloudiness =
                        (data.clouds.all / 100) * preferencesList.preferredWeather.cloudiness;
                    const weightedWindspeed =
                        (data.wind.speed / 100) * preferencesList.preferredWeather.windspeed;
                    const weightedScore = parseFloat(
                        weightedTemperature + weightedCloudiness + weightedWindspeed
                    ).toFixed(2);

                    return {
                        ...data,
                        score: weightedScore,
                    };
                });

                processedData.sort((a, b) => b.score - a.score); // Sort by score
                setCityListWeatherData(processedData);
            } catch (error) {
                console.error(error);
                setError(error);
            }
        };

        fetchData();
    }, [cityList, preferencesList]);

    if (error) {
        return (
            <span className="weather-error">
        <p>Er is iets mis gegaan met het ophalen van de gegevens. </p>
        <p>
          Kijk nog eens locatienamen in jouw profiel na en wijzig ze desnoods en
          probeer het nog eens.
        </p>
      </span>
        );
    }

    if (cityListWeatherData.length === 0) {
        return (
            <span className="weather-error">
        <p>Het lijkt dat je momenteel nog geen locaties heb opgeslagen.</p>
      </span>
        );
    }

    if (isNaN(cityListWeatherData[0].score)) {
        return (
            <span className="weather-error">
        <p>
          Het lijkt dat je momenteel nog geen weersvoorkeuren aangegeven in jouw
          profiel. Pas deze aan en sla ze op en probeer het nog eens
        </p>
      </span>
        );
    }

    return (
        <section className="weatherCards">
            {cityListWeatherData.map((cityWeather) => (
                <WeatherCard
                    key={cityWeather.name}
                    name={cityWeather.name}
                    tempK={cityWeather.main.temp}
                    score={cityWeather.score}
                    weatherMain={cityWeather.weather[0].main}
                    weatherDescription={cityWeather.weather[0].description}
                    windDegree={cityWeather.wind.deg}
                    weatherWindSpeed={cityWeather.wind.speed}
                    humidity={cityWeather.main.humidity}
                    clouds={cityWeather.clouds.all}
                />
            ))}
        </section>
    );
}

export default SavedCitiesList;