import personService from '../services/personService'

const Filter = ({filter, handeFilterChange}) => {
    return (
        <div>
        filter show with
        <input
          value={filter}
          onChange={handeFilterChange}
        />
      </div>
    )
}

export default Filter