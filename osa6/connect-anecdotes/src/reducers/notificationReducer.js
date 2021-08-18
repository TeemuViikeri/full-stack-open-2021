let timeoutId

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
    clearTimeout(timeoutId)
    dispatch({
      type: 'SET',
      data: {
        notification,
      },
    })
    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export const clearNotification = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CLEAR',
    })
  }
}

export default notificationReducer
