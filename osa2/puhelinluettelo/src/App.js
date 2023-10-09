import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [successMessage, setSuccessMessage] = useState('Person added succesfully!')

  useEffect(() => {
      personService
        .getAll()
        .then(response => {
          setPersons(response.data)
        })
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter persons={persons} setPersons={setPersons}/>
      <h3>Add new</h3>

      <PersonForm 
        persons = {persons} 
        setPersons = {setPersons}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} setPersons = {setPersons}/>
    </div>
  )

}

export default App