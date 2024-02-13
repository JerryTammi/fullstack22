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
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(response => response.data)
      .then(allPersons => {
      setPersons(allPersons)
    })
  }, [])

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handeFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const hideNotif = () => {
    setTimeout(() => {
      setError(null)
      setNotification(null)
    }, 2000);
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (!newName || !newNumber) {
      setError('A name and number is required!')
      hideNotif()
      return
    }

    let contains = false
    const personExists = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())

    if (personExists && window.confirm(`${newName} is already added to the phonebook. Do you want to update their number?`)) {
      const updatedPerson = {...personExists, number: newNumber}
      contains = true
      personService.updatePerson(updatedPerson)
      setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
      setNotification(`${newPerson.name} number was updated!`)
      hideNotif()
    }

    if (!contains) {
      personService.create(newPerson)
        .then(response => response.data)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
        })
      setNotification(`${newPerson.name} was added to the phonebook!`)
      hideNotif()
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    if (window.confirm("Confirm delete!")) {
      personService.deletePerson(person)
        .then(response => response.data)
        .catch(error => {
          setError(`Information of ${person.name} has already been removed from the server!`)
          hideNotif()
      })
      personService.getAll()
        .then(response => response.data)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setNotification(`Information of ${person.name} was removed from the server!`)
          hideNotif()
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Error message={error}/>
      <Notification message={notification}/>
      <Filter 
        filter={filter}
        handeFilterChange={handeFilterChange}
      />
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <Persons
        personsToShow={personsToShow}
        deletePerson={deletePerson}
      />
    </div>
  )

}

export default App