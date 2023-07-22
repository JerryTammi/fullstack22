const PersonForm = ({persons, newName, newNumber, setPersons, setFilteredPersons, setNewName, setNewNumber}) => {
    const addName = (event) => {
        event.preventDefault()
        const phonebookObject = {
          name: newName,
          number: newNumber
        }
        let contains = false
        persons.map(person =>
            {if (person.name === newName) {
              window.alert(`${newName} is already added to phonebook`)
              contains = true
            }}
    
          )
    
        if (!contains) {
          setPersons(persons.concat(phonebookObject))
          setFilteredPersons(persons.concat(phonebookObject))
          setNewName('')
          setNewNumber('')
        }
      }
    
      const handleNameChange = (event) => {
        setNewName(event.target.value)
      }
    
      const handlePhonenumberChange = (event) => {
        setNewNumber(event.target.value)
      }
    return (
        <div>
            <form onSubmit={addName}>
                <div>
                name: 
                <input 
                    value={newName}
                    onChange={handleNameChange}
                />
                </div>
                <div>
                number: 
                <input 
                    value={newNumber}
                    onChange={handlePhonenumberChange}
                />
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm