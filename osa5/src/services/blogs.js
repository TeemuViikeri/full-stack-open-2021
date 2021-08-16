import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, blog, config)
  return res.data
}

const update = async (id, blog) => {
  const res = await axios.put(`${baseUrl}/${id}`, blog)
  return res.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

const o = { getAll, setToken, create, update, remove }

export default o
