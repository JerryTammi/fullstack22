import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = person => {
    return axios.post(baseUrl, person)
}

const deletePerson = person => {
    return axios.delete(`${baseUrl}/${person.id}`, person)
}

const updatePerson = (person) => {
    return axios.put(`${baseUrl}/${person.id}`, person)
}

export default { 
    getAll: getAll,
    create: create,
    deletePerson: deletePerson,
    updatePerson: updatePerson
  }
