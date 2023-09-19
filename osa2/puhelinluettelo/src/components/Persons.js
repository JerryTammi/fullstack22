const Persons = ({persons}) => {
    return (
      <div>
        <ul>
        {persons.map(person =>
        <li key={person.id}>{person.name} {person.number} <button type="submit">Delete</button></li>
        )}
        </ul>
      </div>
    )
}

export default Persons
