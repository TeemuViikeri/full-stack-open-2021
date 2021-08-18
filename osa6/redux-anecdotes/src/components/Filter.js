import React from 'react'
import { useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer'

export default function Filter() {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const string = event.target.value
    dispatch(filter(string))
  }

  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input name='filter' onChange={handleChange} />
    </div>
  )
}
