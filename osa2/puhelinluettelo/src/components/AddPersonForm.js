import React from 'react'

export default function AddPersonForm({
  name,
  number,
  submitHandler,
  nameChangeHandler,
  numberChangleHandler,
}) {
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          name: <input onChange={nameChangeHandler} value={name} />
        </div>
        <div>
          number: <input onChange={numberChangleHandler} value={number} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}
