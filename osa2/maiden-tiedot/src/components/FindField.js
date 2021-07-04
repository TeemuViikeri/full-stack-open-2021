import React from 'react'

export default function FindField({ handleOnChange, findValue }) {
  return (
    <div>
      find countries
      <input onChange={handleOnChange} value={findValue} />
    </div>
  )
}
