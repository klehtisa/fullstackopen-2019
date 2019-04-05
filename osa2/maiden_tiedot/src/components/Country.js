import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather'

const Country = ({ country_id, countries }) => {
  const [ weather, setWeather ] = useState('')

  useEffect(() => {
    setWeather('')
    axios
      .get('http://api.apixu.com/v1/current.json?key=f096ce4a7db6421ca5f165658190304&q=' + 
        countries[country_id].capital)
      .then(response => {
        setWeather(response.data) 
      })
  }, [])

  return (
    <div>
      <h1>{countries[country_id].name}</h1>
      <p>capital {countries[country_id].capital}</p>
      <p>population {countries[country_id].population}</p>
      <h2>languages</h2>
      <ul>
        {countries[country_id].languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img alt="flag" src={countries[country_id].flag} height="200"/>
      <Weather weather={weather} location={countries[country_id].capital} />
    </div>
  )
} 

export default Country