import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Button
const Button = ({ handleClick, text }) => (
  <>
  <button onClick={handleClick}>
  {text}
  </button>
  </>
)

const Anecdote = ({ anecdote, votes, mostVoted }) => {
  if (mostVoted === true) {
    if (votes > 0) {
      return (
        <>
        <h1>Anecdote with most votes</h1>
          <p>{anecdote}</p>
          <p>has {votes} votes</p>  
        </>
      )
    } else return (
      <>
      </>
    )
  } else {
    return (
      <>
        <h1>Anecdote of the day</h1>
        <p>{anecdote}</p>
        <p>has {votes} votes</p>
      </>
    )
  }
}

const App = (props) => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * props.anecdotes.length))
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)
 
  const nextAnecdote = () => 
    setSelected(Math.floor(Math.random() * props.anecdotes.length))

  const voteAnecdote = () => {
    const votes_copy = votes
    votes_copy[selected] += 1
    // Alla oleva ei suostu käynnistämään automaatissta uudelleen renderöintiä
    setVotes(votes_copy)
    let maxId = 0
    let maxVotes = 0
    for (let i = 0; i < props.anecdotes.length; i += 1) {
      if (votes_copy[i] > maxVotes) {
        maxId = i
        maxVotes = votes_copy[i]
      }
    }
    setMostVoted(maxId)
    // Koska ei renderöidy vaikka votes muuttuu, oli rakennettava refresh -hässäkkä 
    refresh()
  } 

  return (
    <div>      
      <Anecdote anecdote={props.anecdotes[selected]} votes={votes[selected]} mostVoted={false}/>
      <Button text="vote" handleClick={voteAnecdote}/>
      <Button text="next anecdote" handleClick={nextAnecdote}/>
      <Anecdote anecdote={props.anecdotes[mostVoted]} votes={votes[mostVoted]} mostVoted={true}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const refresh = () => {
  ReactDOM.render(<App anecdotes={anecdotes} />, 
  document.getElementById('root'))
}

refresh()
