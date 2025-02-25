import WeatherOverview from "../weatheroverview/WeatherOverview.jsx";
import kelvinToCelcius from "../../helpers/kelvinToCelsius.jsx";
const WeatherCardList = ({ weatherData }) => {
    console.log("Weather temp Data:", weatherData);


    if (!Array.isArray(weatherData)) {
        console.error("Invalid data: weatherData should be an array.");
        return null;
    }

    return (
        <section className="weatherCards">
            {weatherData.map((locationWeather) => {

                const tempK = locationWeather.main?.temp;


                const temp = kelvinToCelcius(tempK);


                if (temp === null) {
                    console.warn(`Skipping invalid temperature for ${locationWeather.name}`);
                    return null;
                }

                return (
                    <WeatherOverview
                        key={locationWeather.id || locationWeather.name || Math.random()}
                        name={locationWeather.name}
                        temp={temp} // Verwerkte temperatuur
                        score={locationWeather.score}
                        weatherMain={locationWeather.weather?.[0]?.main}
                        weatherDescription={locationWeather.weather?.[0]?.description}
                        windDegree={locationWeather.wind?.deg}
                        weatherWindSpeed={locationWeather.wind?.speed}
                        humidity={locationWeather.main?.humidity}
                        clouds={locationWeather.clouds?.all}
                    />
                );
            })}
        </section>
    );
};

export default WeatherCardList;