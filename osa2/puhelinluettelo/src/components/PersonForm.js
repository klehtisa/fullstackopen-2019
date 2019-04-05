import React from 'react'

const PersonForm = ({ valueName, setName, valueNumber, setNumber, addPerson }) => {

  return (
    <form onSubmit={addPerson}>
    <div>nimi: <input value={valueName} onChange={setName}/></div>
    <div>numero: <input value={valueNumber} onChange={setNumber}/></div>
    <div><button type="submit">lisää</button></div>
    </form>
  )
}

export default PersonForm
