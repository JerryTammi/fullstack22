import { useState, useEffect } from 'react'
import './index.css'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/personService'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      <Notification message={successMessage}/>
      <Error message={errorMessage}/>

      <Filter persons={persons} setPersons={setPersons}/>
      <h3>Add new</h3>

      <PersonForm 
        persons = {persons} 
        setPersons = {setPersons}
        setSuccessMessage = {setSuccessMessage}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} setPersons = {setPersons} setErrorMessage = {setErrorMessage}/>
    </div>
  )

}

export default App