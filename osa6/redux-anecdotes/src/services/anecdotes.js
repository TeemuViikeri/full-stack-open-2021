import axios from 'axios'
import { asObject } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const service = {
  getAll: async () => {
    const res = await axios.get(baseUrl)
    return res.data
  },

  create: async (content) => {
    const anecdote = asObject(content)
    const res = await axios.post(baseUrl, anecdote)
    return res.data
  },

  update: async (anecdote) => {
    const res = await axios.put(`${baseUrl}/${anecdote.id}`, {
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    return res.data
  },
}

export default service
