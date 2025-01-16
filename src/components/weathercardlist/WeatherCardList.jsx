import WeatherOverview from "../weatheroverview/WeatherOverview.jsx";

export const WeatherCardList = ({weatherData})=> (
    <section className="weatherCards">
        {weatherData.map((locationWeather)=>(
            <WeatherOverview
            key={locationWeather.name}
            name={locationWeather.name}
            tempK={locationWeather.main?.temp}
            score={locationWeather.score}
            weatherMain={locationWeather.weather?.[0]?.main}
            weatherDescription={locationWeather.weather?.[0]?.description}
            windDegree={locationWeather.wind?.deg}
            weatherWindSpeed={locationWeather.wind?.speed}
            humidity={locationWeather.main?.humidity}
            clouds={locationWeather.clouds?.all}
            />
        ))}
    </section>
)