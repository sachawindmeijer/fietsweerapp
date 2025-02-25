// import kelvinToCelcius from "../../helpers/kelvinToCelsius";
import WeatherIcon from "../../helpers/WeatherIcon.jsx";
import windDirection from "../../helpers/windDirection";
import windSpeed from "../../helpers/windSpeed";
import windSockIcon from "../../assets/icons/windsock.jpg"
import humidityIcon from "../../assets/icons/humidity.png"
import cloudIcon from "../../assets/icons/clouds blue.png"
import "./WeatherOverview.css"


function WeatherOverview({
                         name,
                         temp,
                         weatherMain,
                         weatherDescription,
                         windDegree,
                         weatherWindSpeed,
                         humidity,
                         clouds,
                         id,
    score
                     }) {
    return (
        <article className="weather-overview" key={id}>
            <div className="weather-name-score">
                <h4>{name}</h4>
                <p>Score: {score}</p>
            </div>
            <div className="weather-description-container">
                <p>{temp}</p>
                <div className="icon-wrapper">
                    <WeatherIcon type={weatherMain} />
                </div>
                <p>{weatherDescription}</p>

                <p><span className="flex"><img src={windSockIcon} alt="Windsok" width="20"/>
                 {windSpeed(weatherWindSpeed)}, {windDirection(windDegree)}</span></p>
                <p><span className="flex"><img src={humidityIcon} alt="Luchtvochtigheid" width="20"/>
                {humidity} %</span></p>
                <p><span className="flex"><img src={cloudIcon} alt="bewolkt" width="20"/>
                {clouds} %</span></p>
            </div>
        </article>
    )
}

export default WeatherOverview