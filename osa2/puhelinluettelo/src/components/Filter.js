const Filter = ({persons, setFilteredPersons}) => {
    const handleFilteredObjectsChange = (event) => {
        const filteredList = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
        setFilteredPersons(filteredList)
      }
    return (
        <div>
            filter show with
            <input onChange={handleFilteredObjectsChange}/>
        </div>
    )
}

export default Filter