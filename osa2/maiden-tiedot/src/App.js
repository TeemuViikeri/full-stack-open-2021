import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FindField from './components/FindField'
import Countries from './components/Countries'
import CountryInfo from './components/CountryInfo'

function App() {
  const [countries, setCountries] = useState([])
  const [findValue, setFindValue] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((res) => {
      const countries = res.data.filter((country) =>
        country.name.toLowerCase().includes(findValue.toLowerCase())
      )
      setCountries(countries)
    })
  }, [findValue])

  const handleOnChange = (e) => {
    setFindValue(e.target.value)
  }

  const handleShowClick = (country) => {
    setCountries([country])
  }

  if (countries.length > 10) {
    return (
      <div>
        <FindField handleOnChange={handleOnChange} findValue={findValue} />
        <div>Too many matches, specify another filter</div>
      </div>
    )
  } else if (countries.length > 1) {
    return (
      <div>
        <FindField handleOnChange={handleOnChange} findValue={findValue} />
        <Countries countries={countries} handleShowClick={handleShowClick} />
      </div>
    )
  } else if (countries.length > 0) {
    return (
      <div>
        <FindField handleOnChange={handleOnChange} findValue={findValue} />
        <CountryInfo country={countries[0]} />
      </div>
    )
  } else {
    return (
      <div>
        <FindField handleOnChange={handleOnChange} findValue={findValue} />
        <div>No countries found</div>
      </div>
    )
  }
}

export default App
