import personService from '../services/personService'

const Persons = ({personsToShow, deletePerson}) => {
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        <ul>
        {personsToShow.map(person =>
        <li key={person.name}>
          {person.name} {person.number}
          <button type="submit" onClick={() => deletePerson(person)}>Delete</button>
        </li>
        )}
        </ul>
      </div>
    </div>
  )
}

export default Persons
