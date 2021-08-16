import React from 'react'

const Notification = ({ message, success }) => {
  if (message === null) return null

  const notificationStyle = {
    color: success ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 16,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderStyle: 'solid',
  }

  return (
    <div data-cy='notification' style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification
