function CalculateWeightedScore(data, preferredWeather) {
    if (!data || !preferredWeather) {
        throw new Error("Onvoldoende gegevens voor scoreberekening.");
    }

    const weightedTemperature =
        ((data?.main?.temp || 0) / 100) * (preferredWeather.temperature || 1);
    const weightedCloudiness =
        ((data?.clouds?.all || 0) / 100) * (preferredWeather.cloudiness || 1);
    const weightedWindspeed =
        ((data?.wind?.speed || 0) / 100) * (preferredWeather.windspeed || 1);

    return (
        weightedTemperature + weightedCloudiness + weightedWindspeed
    ).toFixed(2);
}
export default CalculateWeightedScore