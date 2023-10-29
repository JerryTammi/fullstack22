import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const deletePerson = personId => {
    return axios.delete(`${baseUrl}/${personId}`)
}

const updatePerson = updatedObject => {
    const url = `${baseUrl}/${updatedObject.id}`
    return axios.put(url, updatedObject)
}

export default { 
    getAll: getAll,
    create: create,
    deletePerson: deletePerson,
    updatePerson: updatePerson
  }
