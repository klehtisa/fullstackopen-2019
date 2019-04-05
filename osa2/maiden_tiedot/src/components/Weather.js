import React from 'react'

const Weather = ({weather, location}) => {
  if (weather === '') {
    return (
      <></>
    )
  } else {
    return (
      <div>
        <h2>Weather in {location}</h2>
        <p><strong>temperature: </strong>{weather.current.temp_c} Celsius</p>
        <img alt="w-logo" src={weather.current.condition.icon} />
        <p><strong>wind: </strong>{weather.current.wind_kph} kph direction {weather.current.wind_dir}</p>
      </div>
    )
  }
}

export default Weather