import { useState, useEffect } from 'react'
import personService from '../services/personService'

const PersonForm = ({persons, setPersons, setSuccessMessage}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const addName = (event) => {
      event.preventDefault()
      const phonebookObject = {
        name: newName,
        number: newNumber
      }
      let contains = false
      persons.map(person => {
          if (person.name === newName) {
            if (window.confirm(`${newName} is already added to phonebook. Update with new number?`)) {
              phonebookObject['id'] = person.id
              personService.updatePerson(phonebookObject)
              personService.getAll()
                .then(response => {
                  setPersons(response.data)
                })
                .catch(error => console.log(error))
                setSuccessMessage(`${newName}'s number updated!`)
                setTimeout(() => {
                  setSuccessMessage(null)
                }, 2000)
            }
            contains = true
          }}
  
        )
  
      if (!contains) {
        personService
          .create(phonebookObject)
          .then(response => {
            setNewName('')
            setNewNumber('')
          })
        personService
        .getAll()
          .then(response => {
            setPersons(response.data)
          })
        setSuccessMessage(`Added ${newName}`)
              setTimeout(() => {
                setSuccessMessage(null)
              }, 2000)
      }
    }
  
    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }
  
    const handlePhonenumberChange = (event) => {
      setNewNumber(event.target.value)
    }
  return (
      <div>
          <form onSubmit={addName}>
              <div>
              name: 
              <input 
                  value={newName}
                  onChange={handleNameChange}
              />
              </div>
              <div>
              number: 
              <input 
                  value={newNumber}
                  onChange={handlePhonenumberChange}
              />
              </div>
              <div>
              <button type="submit">add</button>
              </div>
          </form>
      </div>
  )
}

export default PersonForm