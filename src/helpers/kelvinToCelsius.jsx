const kelvinToCelcius = (temp) => {
    if (typeof temp !== "number") {
        console.warn("Invalid temperature value");
        return null;
    }


    const celsiusTemp = temp > 200 ? Math.round(temp - 273.15) : temp;

    return ` ${celsiusTemp} °C`;
}
export default kelvinToCelcius