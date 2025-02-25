import React, {useEffect, useState} from 'react';
import axios from 'axios';
import kelvinToCelsius from "../../helpers/kelvinToCelsius.jsx";
import TomorrowDate from "../../helpers/TomorrowDate.jsx";
import windDirection from "../../helpers/windDirection.jsx";
import windSpeed from "../../helpers/windSpeed.jsx";
import WeatherIcon from "../../helpers/WeatherIcon.jsx";


function TomorrowWeather({ coordinates, onWeatherFetched, onError }) {
    const [tomorrowWeather, setTomorrowWeather] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const apiKey = import.meta.env.VITE_WEER_API_KEY;

    useEffect(() => {
        const controller = new AbortController();
        async function fetchTomorrowWeather() {
            setLoading(true);
            try {
                setError(false);
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric&lang=nl`,
                { signal: controller.signal }
                );

                const tomorrowForecasts = response.data.list.filter((singleForecast) => {
                    const forecastDate = new Date(singleForecast.dt * 1000).toISOString().split("T")[0];
                    return forecastDate === TomorrowDate();
                });

                if (tomorrowForecasts.length === 0) {
                    setTomorrowWeather(null);

                    if (onError) {
                        onError("Geen weersgegevens beschikbaar voor morgen.");
                    }
                    return;
                }

                let bestForecast = tomorrowForecasts.reduce((prev, curr) => {
                    return Math.abs(new Date(curr.dt * 1000).getHours() - 12) <
                    Math.abs(new Date(prev.dt * 1000).getHours() - 12)
                        ? curr
                        : prev;
                });
                setTomorrowWeather(bestForecast);

                if (onWeatherFetched) {
                    onWeatherFetched(bestForecast);
                }
            } catch (err) {
                if (err.code === 'ERR_CANCELED') {
                    console.log("Request geannuleerd");
                } else {
                    console.error("Fout bij ophalen van weersvoorspelling voor morgen", err);
                    setError(true);
                    if (onError) {
                        onError(err);
                    }
                }
            } finally {
                setLoading(false);
            }
        }

        if (coordinates) {
            fetchTomorrowWeather();
        }
        return () => {
            controller.abort();
        };
    }, [coordinates, apiKey, onError, onWeatherFetched]);

    return (
        <div className="tab">
            {error && <span>Er is iets misgegaan met het ophalen van de data.</span>}
            {loading && <span>Loading...</span>}

            {tomorrowWeather ? (
                <article className="weather-data">
                    <h4 className="sort-info">Morgen</h4>
                    <span>{kelvinToCelsius(tomorrowWeather.main.temp)}</span>

                    <section className="icon-wrapper-search">
                        <WeatherIcon type={tomorrowWeather.weather[0].main} />

                        <div className="info-weather">
                            <p>{tomorrowWeather?.weather?.[0]?.description}</p>
                            <p>Windrichting: {windDirection(tomorrowWeather.wind.deg)}</p>
                            <p>Windkracht: {windSpeed(tomorrowWeather.wind.speed)}</p>
                            <p>Luchtvochtigheid: {tomorrowWeather.main.humidity}%</p>
                            <p>Bewolking: {tomorrowWeather.clouds.all}%</p>
                        </div>
                    </section>
                </article>
            ) : (
                !loading && <span>Geen weersgegevens beschikbaar voor morgen.</span>
            )}
        </div>
    );
}

export default TomorrowWeather;
