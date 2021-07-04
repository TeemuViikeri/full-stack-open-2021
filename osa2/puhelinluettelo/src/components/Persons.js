import React from 'react'
import Person from './Person'

export default function Persons({ persons, filterValue, handleNumberDelete }) {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filterValue.toLowerCase())
        )
        .map((person) => {
          return (
            <Person
              key={person.id}
              person={person}
              handleNumberDelete={handleNumberDelete}
            />
          )
        })}
    </div>
  )
}
