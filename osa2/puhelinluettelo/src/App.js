import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [successMessage, setSuccessMessage] = useState('Person added succesfully!')

  useEffect(() => {
      personService
        .getAll()
        .then(response => {
          setPersons(response.data)
          setFilteredPersons(response.data)
        })
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter persons={persons} setFilteredPersons={setFilteredPersons}/>
      <h3>Add new</h3>

      <PersonForm 
        persons = {persons} 
        newName = {newName}
        newNumber = {newNumber}
        setPersons = {setPersons}
        setFilteredPersons = {setFilteredPersons}
        setNewName = {setNewName}
        setNewNumber = {setNewNumber}
      />

      <h2>Numbers</h2>

      <Persons persons={filteredPersons} setFilteredPersons={setFilteredPersons} setPersons = {setPersons}/>
    </div>
  )

}

export default App