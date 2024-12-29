import React from 'react';
import SunnyIcon from '../assets/icons/sun.svg';
import RainIcon from '../assets/icons/rain.svg';
import CloudyIcon from '../assets/icons/clouds.svg';
import SnowIcon from '../assets/icons/snow.svg';
import WindyIcon from '../assets/icons/wind.svg';
import DrizzleIcon from '../assets/icons/sun-rain.svg';

const WeatherIcon = ({ type }) => {
    const weatherIcons = {
        Clear: <img src={SunnyIcon} alt="Sunny weather" />,
        Clouds: <img src={CloudyIcon} alt="Cloudy weather" />,
        Drizzle: <img src={DrizzleIcon} alt="Drizzle weather" />,
        Rain: <img src={RainIcon} alt="Rainy weather" />,
        Snow: <img src={SnowIcon} alt="Snowy weather" />,
        default: <img src={WindyIcon} alt="Windy or unclear weather" />,
    };

    return weatherIcons[type] || weatherIcons.default;
};

export default WeatherIcon;