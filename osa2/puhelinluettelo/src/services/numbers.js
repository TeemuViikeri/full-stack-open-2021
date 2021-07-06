import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then((res) => res.data)
}

const create = (object) => {
  const req = axios.post(baseUrl, object)
  return req.then((res) => res.data)
}

const update = (id, object) => {
  const req = axios.put(`${baseUrl}/${id}`, object)
  return req.then((res) => res.data)
}

const remove = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`)
  return req.then((res) => res.data)
}

const service = { getAll, create, update, remove }

export default service
