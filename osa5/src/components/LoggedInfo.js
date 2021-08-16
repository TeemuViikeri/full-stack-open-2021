import React from 'react'

export default function LoggedInfo({ user, setUser }) {
  return (
    <div>
      {user.name} logged in{' '}
      <button
        data-cy="logout-btn"
        onClick={() => {
          window.localStorage.clear()
          setUser(null)
        }}
      >
        Logout
      </button>
    </div>
  )
}
