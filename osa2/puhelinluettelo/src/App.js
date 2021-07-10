import React, { useState, useEffect } from 'react'
import NameFilterField from './components/NameFilterField'
import AddPersonForm from './components/AddPersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import numberService from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isOperationSuccessful, setIsOperationSuccessful] = useState(true)

  useEffect(() => {
    numberService
      .getAll()
      .then((initialNumbers) => {
        setPersons(initialNumbers)
      })
      .catch((error) => {
        const message = error.response.data.message
        setNotificationMessage(message)
        setIsOperationSuccessful(false)
      })
      .finally(() => {
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }, [])

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const personAlreadyExists = persons.some(
      (person) => person.name === newName
    )

    if (personAlreadyExists) {
      const isConfirmed = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      )

      if (isConfirmed) {
        const person = persons.find((p) => p.name === newName)
        const changedPerson = { ...person, number: newNumber }

        numberService
          .update(changedPerson.id, changedPerson)
          .then((updatedNumberInResponse) => {
            setPersons(
              persons.map((p) =>
                p.id !== changedPerson.id ? p : updatedNumberInResponse
              )
            )
            setNotificationMessage(`Updated ${updatedNumberInResponse.name}`)
            setIsOperationSuccessful(true)
          })
          .catch((error) => {
            const message = error.response.data.message
            setNotificationMessage(message)
            setIsOperationSuccessful(false)
          })
          .finally(() => {
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
      }
    } else {
      numberService
        .create({ name: newName, number: newNumber })
        .then((createdNumberInResponse) => {
          setPersons(persons.concat(createdNumberInResponse))
          setNotificationMessage(`Added ${createdNumberInResponse.name}`)
          setIsOperationSuccessful(true)
        })
        .catch((error) => {
          const message = error.response.data.message
          setNotificationMessage(message)
          setIsOperationSuccessful(false)
        })
        .finally(() => {
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleNumberDelete = (name, id) => {
    const isConfirmed = window.confirm(`Delete ${name}?`)

    if (isConfirmed) {
      numberService
        .remove(id)
        .then(() => {
          setNotificationMessage(`Deleted ${name}`)
          setIsOperationSuccessful(true)
        })
        .catch((error) => {
          const message = error.response.data.message
          setNotificationMessage(message)
          setIsOperationSuccessful(false)
        })
        .finally(() => {
          setPersons(persons.filter((p) => p.id !== id))
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <>
      <div>
        <h1>Phonebook</h1>

        {notificationMessage === null ? null : (
          <Notification
            message={notificationMessage}
            success={isOperationSuccessful}
          />
        )}

        <NameFilterField
          handleFilterChange={handleFilterChange}
          value={filterValue}
        />

        <h2>add a new</h2>

        <AddPersonForm
          name={newName}
          number={newNumber}
          submitHandler={handleSubmit}
          nameChangeHandler={handleNameChange}
          numberChangleHandler={handleNumberChange}
        />

        <h2>Numbers</h2>

        <Persons
          persons={persons}
          filterValue={filterValue}
          handleNumberDelete={handleNumberDelete}
        />
      </div>
    </>
  )
}

export default App
