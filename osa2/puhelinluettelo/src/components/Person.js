import React from 'react'

export default function Person({ person, handleNumberDelete }) {
  const name = person.name === '' ? 'unnamed' : person.name

  return (
    <div>
      {person.name} {person.number}{' '}
      <button onClick={() => handleNumberDelete(name, person.id)}>delete</button>
    </div>
  )
}
