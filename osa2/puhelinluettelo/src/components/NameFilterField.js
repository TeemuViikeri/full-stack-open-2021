import React from 'react'

export default function NameFilterField({ handleFilterChange, filterValue }) {
  return (
    <div>
      <div>
        filter shown with{' '}
        <input onChange={handleFilterChange} value={filterValue} />
      </div>
    </div>
  )
}
