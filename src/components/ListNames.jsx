import React, { useContext } from 'react'
import { PeopleContext } from '../context/people'

const ListNames = () => {
  const people = useContext(PeopleContext)
  return (
    <ul>
      {people.length > 0 ? (
        people.map((person) => <li>{person?.name}</li>)
      ) : (
        <li>no data yet</li>
      )}
    </ul>
  )
}

export default ListNames
