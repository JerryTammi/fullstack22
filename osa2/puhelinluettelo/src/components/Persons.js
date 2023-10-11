import personService from '../services/personService'

const Persons = ({persons, setPersons, setErrorMessage }) => {

  const handleClick = (person) => {
    if (window.confirm("Confirm delete!")) {
      personService.deletePerson(person)
      .catch(error => {
        setErrorMessage(`Information of ${person.name} has already been removed from the server!`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
      }) 
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
