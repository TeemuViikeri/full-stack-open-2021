import React from 'react'

export default function WeatherInfo({ data }) {
  return (
    <div>
      <div>
        <b>temperature:</b>
        {` ${data.current.temperature} Celcius`}
      </div>
      <img src={data.current.weather_icons} alt='Weather icon' width={50} />
      <div>
        <b>wind:</b>
        {` ${data.current.wind_speed} km/h direction ${data.current.wind_dir}`}
      </div>
    </div>
  )
}
