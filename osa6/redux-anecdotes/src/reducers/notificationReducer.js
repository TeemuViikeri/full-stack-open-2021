const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET':
      return action.data.notification
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const setNotification = (notification, seconds) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET',
      data: {
        notification,
      },
    })
    setTimeout(() => {
      console.log('in setTimeout')
      dispatch({
        type: 'CLEAR',
      })
    }, seconds * 1000)
  }
}

export default notificationReducer
