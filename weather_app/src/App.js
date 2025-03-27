import React, { useState } from "react";
import { Input } from "./components/ui/Input";
import { Button } from "./components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/Card";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiFog } from "react-icons/wi";

const API_KEY = "7fc948e002815df3e1811da8e4caea4c";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return <WiDaySunny size={50} />;
      case "Clouds":
        return <WiCloud size={50} />;
      case "Rain":
      case "Drizzle":
        return <WiRain size={50} />;
      case "Snow":
        return <WiSnow size={50} />;
      case "Fog":
      case "Mist":
      case "Haze":
        return <WiFog size={50} />;
      default:
        return <WiDaySunny size={50} />;
    }
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <Input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-64 border p-2 rounded-md"
      />
      <Button onClick={fetchWeather} disabled={loading} className="px-4 py-2">
        {loading ? "Loading..." : "Get Weather"}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
      {weather && (
        <Card className="w-80 p-4 shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold">{weather.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-2">
            {getWeatherIcon(weather.weather[0].main)}
            <p className="text-2xl">{weather.main.temp}°C</p>
            <p className="capitalize">{weather.weather[0].description}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeatherApp;
