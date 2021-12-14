import React, { useState, useEffect, useReducer } from 'react'
import ListNames from './components/ListNames'
import { getPeople, getPerson } from './apis/people'
import { PeopleContext } from './context/people'

const sampleReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_ADD_MODAL':
      return {
        ...state,
        isAddModalOpen: true,
      }
    case 'OPEN_EDIT_MODAL':
      return {
        ...state,
        isEditModalOpen: true,
      }
    case 'CLOSE_ALL_MODAL':
      return {
        isEditModalOpen: false,
        isAddModalOpen: false,
      }
    default:
      return state
  }
}

function App() {
  const [people, setPeople] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [modalState, modalDispatch] = useReducer(sampleReducer, {
    isAddModalOpen: false,
    isEditModalOpen: false,
  })

  const handleAddModalOpen = () => {
    modalDispatch({ type: 'OPEN_ADD_MODAL' })
  }

  const handleEditModalOpen = () => {
    modalDispatch({ type: 'OPEN_EDIT_MODAL' })
  }

  const handleCloseModal = () => {
    modalDispatch({ type: 'CLOSE_ALL_MODAL' })
  }

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
    <>
      <PeopleContext.Provider value={people}>
        <div>
          <button onClick={handleAddModalOpen}>Add modal open</button>
          <button onClick={handleEditModalOpen}>Edit modal open</button>
          <button onClick={handleCloseModal}>close all modal</button>
          {isLoading ? (
            <p>{'Loading ...'}</p>
          ) : (
            <div>
              <button onClick={handleAddMorePeople}>add more people</button>
              <p>Here are the Persons that has been fetch</p>
              <div>
                <ListNames />
              </div>
            </div>
          )}

          {modalState.isAddModalOpen && <p>modal add open</p>}
          {modalState.isEditModalOpen && <p>modal edit open</p>}
        </div>
      </PeopleContext.Provider>
      another one
      <ListNames />
    </>
  )
}

export default App
