import { useState } from "react";

function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const searchWeather = async () => {
        if (!city.trim()) return;
        try {
            setError("");
            setWeather(null);
            setLoading(true);

            const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

            console.log("API KEY:", API_KEY ? "FOUND" : "NOT FOUND");

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

            console.log("URL:", url);

            const response = await fetch(url);

            console.log("STATUS:", response.status);

            const data = await response.json();

            console.log("DATA:", data);

            if (!response.ok) {
                setError(data.message || "API error");
                return;
            }

            setWeather(data);

        } catch (error) {
            console.log("ERROR:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            searchWeather();
        }
    };

    return (
        <div className="weather-app">
        <div className="weather-container">

            <h1 className="weather-title">Weather App</h1>

            <input
                className="weather-input"
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <button className="weather-button" onClick={searchWeather} disabled={loading}>
                {loading ? "Loading..." : "Search"}
            </button>

            {error && (
                <div className="weather-error">
                    Error: {error}
                </div>
            )}

            {weather && (
                <div className="weather-result">
                    <h2 className="weather-place">
                        {weather.name}, {weather.sys.country}
                    </h2>

                    <p className="weather-temp">
                        {Math.round(weather.main.temp)}°C
                    </p>

                    <p className="weather-desc">
                        {weather.weather[0].description}
                    </p>

                    <div className="weather-stats">
                        <div className="weather-stat">
                            <span className="weather-stat-label">Humidity</span>
                            <span className="weather-stat-value">{weather.main.humidity}%</span>
                        </div>

                        <div className="weather-stat">
                            <span className="weather-stat-label">Wind</span>
                            <span className="weather-stat-value">{weather.wind.speed} m/s</span>
                        </div>
                    </div>
                </div>
            )}

        </div>
        </div>
    );
}

export default Weather;