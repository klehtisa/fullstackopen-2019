import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Error from './components/Error'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [ notifyText, setNotifyText ] = useState(null)
  const [ errorText, setErrorText ] = useState(null)

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleNameFilter = (event) => setNameFilter(event.target.value) 

  const handleNotify = (message) => {
    setNotifyText(message)
    setTimeout(() => {
      setNotifyText(null)
    }, 5000)
  }

  const handleError = (message) => {
    setErrorText(message)
    setTimeout(() => {
      setErrorText(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    if (nameObject.name.trim() === '') {
      handleError('Nimetön, ei lisätä')
    } else if (persons.filter(person => person.name === nameObject.name).length !== 0) {
      if(window.confirm(`${nameObject.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        let id = persons.find(person => person.name === nameObject.name).id
        personService
          .update(id, nameObject)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id === id?updatedPerson:p))
            handleNotify('Muokattiin ' + newName)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            handleError('Henkiöä ' + newName + ' ei voi muokata palvelimelta')
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      
      personService
        .create(nameObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          handleNotify('Lisättiin ' + newName)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          handleError('Palvelinvirhe')
        })
    }
  }

  const removePerson = (id) => {
    
    let nameTmp = persons.find(p => p.id === id).name
    if(window.confirm(`Poistetaanko ${persons.find(person => person.id === id).name}`)) {
      personService
        .remove(id)
        .then(removed => {  
          setPersons(persons.filter(p => p.id !== id))
          handleNotify('Poistettiin ' + nameTmp)
        })
        .catch(error => {
          handleError('Henkiöä ' + nameTmp + ' ei löydy palvelimelta')
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        setErrorText('Tietoa ei löydy palvelimelta')
      })
  }, [])

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification message={notifyText} />
      <Error message={errorText} />
      <Filter setNameFilter={handleNameFilter}/>
      <h3>lisää uusi</h3>
      <PersonForm setName={handleNameChange} setNumber={handleNumberChange} addPerson={addPerson} 
        valueName={newName} valueNumber={newNumber} />
      <h3>Numerot</h3>
      <Persons personList={persons} personFilter={nameFilter} removePerson={removePerson} />
    </div>
  )

}

export default App