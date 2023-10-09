import personService from '../services/personService'

const Persons = ({persons, setPersons, setFilteredPersons}) => {

  const handleClick = (person) => {
    if (window.confirm("Confirm delete!")) {
      personService.deletePerson(person)
      personService
        .getAll()
        .then(response => {
          setPersons(response.data)
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
          handleClick(person)
        }}>
        Delete</button>
      </li>
      )}
      </ul>
    </div>
  )
}

export default Persons
