import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonFrom'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

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

      <Persons persons={filteredPersons}/>
    </div>
  )

}

export default App