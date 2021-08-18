const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.data.string
    case 'RESET':
      return null
    default:
      return state
  }
}

export const filter = (string) => {
  return {
    type: 'FILTER',
    data: {
      string,
    },
  }
}

export const reset = () => {
  return {
    type: 'RESET',
  }
}

export default filterReducer
