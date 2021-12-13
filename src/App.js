import React, { useState, useEffect } from 'react'
import ListNames from './components/ListNames'
import { getPeople, getPerson } from './apis/people'

function App() {
  const [people, setPeople] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleAddMorePeople = async () => {
    setIsLoading(true)
    const person = await getPerson(people.length + 2)
    setPeople([...people, person])
    setIsLoading(false)
  }

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const responseData = await getPeople(20)
      setPeople(responseData)
      setIsLoading(false)
    })()
  }, [])

  return (
    <div>
      {isLoading ? (
        <p>{'Loading ...'}</p>
      ) : (
        <div>
          <button onClick={handleAddMorePeople}>add more people</button>
          <p>Here are the Persons that has been fetch</p>
          <div>
            <ListNames people={people} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
