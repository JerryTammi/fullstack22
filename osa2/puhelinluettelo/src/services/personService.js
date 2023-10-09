import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const deletePerson = person => {
    const url = `${baseUrl}/${person.id}`
    return axios.delete(url, person)
}

const updatePerson = person => {
    const url = `${baseUrl}/${person.id}`
    return axios.put(url, person)
}

export default { 
    getAll: getAll,
    create: create,
    deletePerson: deletePerson,
    updatePerson: updatePerson
  }
