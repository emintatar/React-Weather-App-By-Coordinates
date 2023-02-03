import React, { useState, useEffect } from "react";
import axios from "axios";
import { usePosition } from "use-position";
import "./App.css";

function App() {
  const [weather, setWeather] = useState([]);
  const { latitude, longitude } = usePosition();

  const getWeatherData = async (lat, lon) => {
    const key = process.env.REACT_APP_API_KEY;
    const lang = navigator.language;
    console.log(lang);

    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=${lang}&units=metric`
      );
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    latitude && longitude && getWeatherData(latitude, longitude);
  }, [latitude, longitude]);

  return (
    <div className="App">
      <h1>Open Weather Map API</h1>
      <h2>Enlem Koordinat:{latitude}</h2>
      <h2>Boylam Koordinat:{longitude}</h2>
      <h2>Koordinat Bölgesi:{weather.name}</h2>
      <h2>Hava Sıcaklığı:{weather.main && weather.main.temp}</h2>
      <h2>Hava Durumu:{weather.main && weather.weather[0].main}</h2>
      <h2>
        Hava Durumu Açıklaması:{weather.main && weather.weather[0].description}
      </h2>
    </div>
  );
}

export default App;
