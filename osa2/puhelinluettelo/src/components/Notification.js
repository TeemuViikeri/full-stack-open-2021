import React from 'react'

export default function Notification({ message, success }) {
  const notificationStyle = {
    color: success ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 16,
		padding: 10,
		marginBottom: 10,
		borderRadius: 5,
		borderStyle: 'solid',
  }

  return <div style={notificationStyle}>{message}</div>
}
