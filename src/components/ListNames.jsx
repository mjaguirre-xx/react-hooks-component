import React from 'react'

const ListNames = ({ people = [] }) => {
  return (
    <ul>
      {people.map((person) => (
        <li>{person?.name}</li>
      ))}
    </ul>
  )
}

export default ListNames
