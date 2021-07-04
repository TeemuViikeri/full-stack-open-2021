import React from 'react'

export default function Countries({ countries, handleShowClick }) {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.name}>
          {country.name}
          <button onClick={() => handleShowClick(country)}>show</button>
        </div>
      ))}
    </div>
  )
}
