
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '6016e440fd3de43bf17c47c7093a9f4b';

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('City Not Found. Make sure you enter the City name correctly.');
      setWeather(null);
    }
  };

  const handleSearch = () => {
    if (city !== '') {
      fetchWeather();
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather">
          <h2>{weather.name}</h2>
          <img 
      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
      alt="Weather Icon"
    />
          <p><b>{weather.weather[0].description}</b></p>
          <h3>{weather.main.temp}°C</h3>
          <p><b>Humidity: {weather.main.humidity}%</b></p>
          <p><b>Wind speed: {weather.wind.speed} m/s</b></p>
        </div>
      )}
    </div>
  );
}

export default App;
