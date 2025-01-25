import axios from "axios";

async function fetchWeather(location, options = {}) {
    const {
        lang = "nl",
        units = "metric",
        apiKey = import.meta.env.VITE_WEER_API_KEY,
    } = options;

    if (!apiKey) {
        throw new Error("API key is required to fetch weather data.");
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
                params: {
                    q: `${location},nl`,
                    appid: apiKey,
                    lang,
                    units,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching weather:", error);
        if (error.response) {
            // Als er een reactie is van de API met een foutstatuscode
            switch (error.response.status) {
                case 404:
                    return {error: "Locatie niet gevonden. Controleer de spelling."};
                case 400:
                    return {error: "Ongeldige locatie. Controleer je invoer."};
                case 500:
                    return {error: "Er is een serverfout opgetreden. Probeer het later opnieuw."};
                default:
                    return {error: "Onbekende fout opgetreden. Probeer het later opnieuw."};
            }
        } else {
            // Fouten zoals netwerkproblemen of andere onverwachte fouten
            return {error: "Er is een probleem met de verbinding. Probeer het later opnieuw."};
        }
    }
}
export default fetchWeather