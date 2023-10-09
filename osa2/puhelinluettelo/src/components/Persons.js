import personService from '../services/personService'

const Persons = ({persons, setPersons, setFilteredPersons}) => {

  const handleClick = (personId) => {
    if (window.confirm("Confirm delete!")) {
      personService.deletePerson(personId)
      personService
        .getAll()
        .then(response => {
          setPersons(response.data)
          setFilteredPersons(response.data)
        })
    }
  }

  return (
    <div>
      <ul>
      {persons.map(person =>
      <li key={person.id}>
        {person.name} {person.number}
        <button type="submit" onClick={() => {
          handleClick(person.id)
        }}>
        Delete</button>
      </li>
      )}
      </ul>
    </div>
  )
}

export default Persons
