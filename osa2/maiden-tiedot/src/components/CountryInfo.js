import React, { useState, useEffect } from 'react'
import WeatherInfo from './WeatherInfo'
import axios from 'axios'

export default function CountryInfo({ country }) {
  const [weatherData, setWeatherData] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
      )
      .then((res) => {
        setWeatherData(res.data)
      })
  })

  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {country.languages.map((language) => {
          return <li key={language.name}>{language.name}</li>
        })}
      </ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} width={100} />
      <h3>Weather in {country.capital}</h3>
      {weatherData !== null ? (
        <WeatherInfo data={weatherData} />
      ) : (
        <div>Loading weather data...</div>
      )}
    </div>
  )
}
