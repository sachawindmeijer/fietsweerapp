import React, {useEffect, useState, useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import './Home.css'
import kelvinToCelcius from "../../helpers/kelvinToCelsius";
import windDirection from "../../helpers/windDirection";
import windSpeed from "../../helpers/windSpeed";
import {useNavigate} from 'react-router-dom';
import HeaderWeather from "../../components/header/headerWeather.jsx";
import NavBar from "../../components/navBar/NavBar";
import Search from "../../components/search/Search.jsx";
import kaart from "../../assets/nlkaart.png"
import Footer from "../../components/footer/Footer.jsx";
import fetchWeather from "../../components/weather/weather.jsx";
import SavedLocationList from "../../components/savedlocationlist/SaveLocationList.jsx";
import WeatherIcon from "../../helpers/WeatherIcon.jsx";
import Button from "../../components/button/Button.jsx";
import TomorrowWeather from "../../components/TomorrowWeather/TomorrowWeather.jsx";


function Home() {
    const [error, setError] = useState(null);
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, toggleLoading] = useState(false);
    const [showTomorrow, setShowTomorrow] = useState(false);
    const {isAuth} = useContext(AuthContext)
    const navigate = useNavigate();


    useEffect(() => {
        async function getWeather() {
            try {
                setError(null);  // Reset error when starting a new request
                toggleLoading(true);
                const data = await fetchWeather(location);

                if (data.error) {
                    setError(data.error);  // Set specific error message if there is an error
                } else {
                    setWeatherData(data);  // Set weather data if no error
                }
            } catch (error) {
                console.error(error);
                setError("Er is een onbekende fout opgetreden. Probeer het later opnieuw.");
            } finally {
                toggleLoading(false);
            }
        }

        if (location) {
            getWeather();
        }
    }, [location]);


    return (
        <main>
            <div className="background">
                <HeaderWeather />
                <NavBar />
                <div className="outer-container">
                    <div className="inner-container">
                        {isAuth ? (
                            <section className="saved-cities-list-container">
                                <SavedLocationList />
                                <div className="onder">
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        text={loading ? "Bezig..." : "Wijzigen"}
                                        className="submit-button"
                                        onClick={() => navigate("/profiel")}
                                    />
                                </div>
                            </section>
                        ) : (
                            <article className="saved-cities-logout-container">
                                <p className="saved-cities-logout-message">
                                    Maak een account of log in om jouw favoriete steden te bewaren en hier te bekijken.
                                </p>
                            </article>
                        )}

                        <div className="right-container">
                            <div className="image-and-search-container">
                                <div className="image-container">
                                    <img src={kaart} alt="Nederland kaart" />
                                </div>

                                <section className="weather-search-container">
                                    <Search setLocationHandler={setLocation} />

                                    {error && <span>{error}</span>}
                                    {loading && <span>Loading...</span>}

                                    {weatherData && (
                                        <article className="weather-data">
                                            <h3 className="sort-info">
                                                {weatherData.name} :</h3>
                                            <h4 className="sort-info">Vandaag</h4>
                                            <span>{kelvinToCelcius(weatherData.main.temp)}</span>
                                            <div className="icon-wrapper-search">
                                                <WeatherIcon type={weatherData.weather[0].main} />
                                                <div className="info-weather">
                                                    <p>{weatherData.weather[0].description}</p>
                                                    <p>Windrichting: {windDirection(weatherData.wind.deg)}</p>
                                                    <p>Windkracht: {windSpeed(weatherData.wind.speed)}</p>
                                                    <p>Luchtvochtigheid: {weatherData.main.humidity}%</p>
                                                    <p>Bewolking: {weatherData.clouds.all}%</p>
                                                </div>
                                            </div>
                                        </article>
                                    )}

                                    {/* Knop om morgenweer te tonen/verbergen */}
                                    {weatherData && weatherData.coord && (
                                        <>
                                            <Button
                                                type="button"
                                                text={showTomorrow ? "Verberg" : "Toon morgen"}
                                                onClick={() => setShowTomorrow((prev) => !prev)}
                                                className={`tomorrow-button ${showTomorrow ? "underline-top" : "underline-bottom"}`}
                                            />
                                            {showTomorrow && (
                                                <TomorrowWeather
                                                    coordinates={{
                                                        lat: weatherData.coord.lat,
                                                        lon: weatherData.coord.lon,
                                                    }}
                                                />
                                            )}
                                        </>
                                    )}
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </main>
    );
}

export default Home;