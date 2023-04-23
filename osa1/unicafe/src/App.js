import { useState } from 'react'

const Button = (props) => {
  const {handle, name} = props
  return (
    <div>
      <button onClick={handle}>{name}</button>
    </div>
  )
}

const StatisticLine = (props) => {
  const {text, value} = props
  return (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const {good, bad, neutral, avg} = props

  const getAll = () => {
    const all = good + bad + neutral
    return all
  }

  const getAverage = () => {
    const average = avg / getAll()
    return average
  }
  const getPositive = () => {
    const positive = good / getAll()
    return (positive * 100) + "%"
  }

  if (getAll() === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={getAll()}/>
          <StatisticLine text="average" value={getAverage()}/>
          <StatisticLine text="positvie" value={getPositive()}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [avg, setAvg] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAvg(avg + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAvg(avg - 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <br/>
      <Button handle={handleGoodClick} name = "good"/>
      <Button handle={handleNeutralClick} name = "neutral" />
      <Button handle={handleBadClick} name = "bad" />
      <br/>
      <Statistics good={good} bad={bad} neutral={neutral} avg={avg} />
    </div>
  )
}
export default App