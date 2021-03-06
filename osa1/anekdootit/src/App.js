import React, { useState } from 'react'

const generateRandom = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

const Header = ({ text }) => <h1>{text}</h1>

const Anecdote = ({ text }) => <p>{text}</p>

const VotesCount = ({ amount }) => <p>has {amount} votes</p>

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const copy = [...votes]
  copy[selected] += 1

  let mostVotes = 0

  for (let i = 0; i < votes.length; i++) {
    if (votes[i] > votes[mostVotes]) {
      mostVotes = i
    }
  }

  return (
    <div>
      <Header text='Anecdote of the day' />
      <Anecdote text={anecdotes[selected]} />
      <VotesCount amount={votes[selected]} />
      <Button text='vote' handleClick={() => setVotes(copy)} />
      <Button
        text='next anecode'
        handleClick={() => setSelected(generateRandom(0, anecdotes.length))}
      />

      <Header text='Anecdote with most votes' />
      <Anecdote text={anecdotes[mostVotes]} />
      <VotesCount amount={votes[mostVotes]} />
    </div>
  )
}

export default App
