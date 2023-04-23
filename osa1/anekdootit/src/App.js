import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0,0,0])
  const [best, setBest] = useState(0)

  const handleNextAnecdoteClick = () => {
    const rnd = Math.floor(Math.random() * (anecdotes.length - 1))
    setSelected(rnd)
  }

  const handleVoteClick = () => {
    const copy = { ...votes}
    copy[selected] += 1
    setVotes(copy)

    var max = votes[0]
    var maxIndex = 0

    for(var i = 1; i < votes.length; i++) {
      console.log('max' + max)
      console.log(votes[i])
      if (votes[i] > max) {
        max = votes[i]
        maxIndex = i
      }
    }
    setBest(maxIndex)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleNextAnecdoteClick}>Next anecdote</button>
      <button onClick={handleVoteClick}>Vote</button>
      <br/>
      <h1>Anecdote with highest amount of votes</h1>
      <br/>
      {anecdotes[best]}
      <br/>
      <p>has {votes[best]} votes</p>
    </div>
  )
}

export default App