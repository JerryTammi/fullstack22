const Course = (props) => {
    const name = props.course.name
    const parts = props.course.parts
    return (
      <div>
        <Header name = {name}/>
        <Content parts = {parts}/>
      </div>
    )
  }
  
  const Header = (props) => {
    return (
        <h2>{props.name}</h2>
    )
  }
  
  const Content = (props) => {
    const parts = props.parts
  
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
  
  const Part = (props) => {
    return (
        <p>{props.part.name} {props.part.exercises}</p>
    )
  }

export default Course