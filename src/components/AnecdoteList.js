import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = (useSelector(
    ({ anecdotes, filter, notification }) => anecdotes.filter(anecdote => anecdote.content.includes(filter))
  ))
  const dispatch = useDispatch()

  const voteAnecdote = anecdote => {
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => voteAnecdote(anecdote)} />
      )}
    </div>
  )
}

export default AnecdoteList