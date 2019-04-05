import React from 'react'

const Filter = ({ setNameFilter }) => {
  
  return (
    <div>
      <p>
        rajaa näytettäviä 
        <input onChange={setNameFilter}/>
      </p>
    </div>
  )
}

export default Filter
