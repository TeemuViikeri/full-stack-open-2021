import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (content) => {
  return {
    content,
    id: getId(),
    votes: 0,
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.update(anecdote)
    const id = votedAnecdote.id
    dispatch({
      type: 'VOTE',
      data: {
        id,
      },
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      data: anecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find((a) => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      }
      return state
        .map((a) => (a.id === id ? votedAnecdote : a))
        .sort((a, b) => b.votes - a.votes)
    case 'CREATE':
      return [...state, action.data]
    case 'INIT':
      return action.data.sort((a, b) => b.votes - a.votes)
    default:
      return state
  }
}

export default reducer
