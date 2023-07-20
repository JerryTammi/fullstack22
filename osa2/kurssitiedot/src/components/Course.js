const Course = ({course}) => {
    const name = course.name
    const parts = course.parts
    return (
      <div>
        <Header name = {name}/>
        <Content parts = {parts}/>
      </div>
    )
  }
  
  const Header = ({name}) => {
    return (
        <h2>{name}</h2>
    )
  }
  
  const Content = ({parts}) => {
    const total = parts.reduce((s, p) => {
      return s + p.exercises
    }, 0)
  
    return (
        <div>
          {parts.map(part =>
            <Part key={part.id} part={part}/>
          )}
        <b>Total of {total} exercises</b>
        </div>
    )
  }
  
  const Part = ({part}) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
  }

export default Course