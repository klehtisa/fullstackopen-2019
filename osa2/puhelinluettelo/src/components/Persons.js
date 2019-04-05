import React from 'react'

const Persons = ({ personList, personFilter, removePerson }) => {

  return (
    <div>
      {personList.filter(person => person.name.toLowerCase().includes(personFilter.toLowerCase()))
        .map(person => <div key={person.name}>{person.name} {person.number} <button onClick={() => removePerson(person.id)} >poista</button></div>)}
    </div>
  )
}

export default Persons
