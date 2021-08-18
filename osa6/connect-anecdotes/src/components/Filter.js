import React from 'react'
import { connect } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    const string = event.target.value
    props.filter(string)
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

const mapDispatchToProps = (dispatch) => {
  return {
    filter: (value) => {
      dispatch(filter(value))
    },
  }
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter
