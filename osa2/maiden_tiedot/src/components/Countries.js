import React from 'react'
import Country from './Country'

const Countries = ({ countries, filter, showId, handleShow }) => {

  const countryCnt = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    .reduce((acc, curr) => acc + 1, 0)

  if (showId > 0) {
    return (
      <div>
        <Country country_id={showId} countries={countries} />
      </div>
    )
  }
  else if (countryCnt === 0 || filter.length === 0) {
    return (
      <div></div>
    )
  } else if (countryCnt === 1) {
    
    const country_id = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    .map(country => country.id)[0]
  
    return (
      <div>
        <Country country_id={country_id} countries={countries} />
      </div>
    )
  } else if (countryCnt > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else {
    return (
      <div>
        {countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
        .map(country => <div key={country.name}>{country.name} <button onClick={() => handleShow(country.id)} key={country.country_id}>show</button></div>)}
      </div>
    )
  }
}

export default Countries