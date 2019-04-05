import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [ countries, setCountries ] = useState([
  ])
  const [ filter, setFilter ] = useState('')
  const [ show, setShow ] = useState(-1)

  const handleFilter = (event) => {
    setFilter(event.target.value)
    setShow(-1)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
       let data = response.data;
        for (let i = 0; i < response.data.length; i += 1) {
          data[i].id  = i
        }
        setCountries(data)
      })
  }, [])

  const handleShowClick = (id) => {
    setShow(id)
    setFilter('')
    document.getElementById('filter').value = ''
  }

  return (
    <div>
      <p>Find countries <input id="filter" onChange={handleFilter}/></p>
      <Countries countries={countries} filter={filter} showId={show} handleShow={handleShowClick} />
    </div>
  )

}

export default App
