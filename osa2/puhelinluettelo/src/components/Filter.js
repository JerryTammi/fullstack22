import personService from '../services/personService'

const Filter = ({persons, setPersons}) => {
    const handleFilteredObjectsChange = (event) => {
        if (event.target.value === "") {
            personService
            .getAll()
            .then(response => {
                setPersons(response.data)
            })
        }
        else {
            const filteredList = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
            setPersons(filteredList)
        }
      }
    return (
        <div>
            filter show with
            <input onChange={handleFilteredObjectsChange}/>
        </div>
    )
}

export default Filter