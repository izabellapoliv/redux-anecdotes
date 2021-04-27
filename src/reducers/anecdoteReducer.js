import anecdoteService from '../services/anecdotes'

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const data = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data
    })
  }
}

export const vote = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      return state.map(
        anecdote => anecdote.id === action.data.id ?
          { ...anecdote, votes: anecdote.votes + 1 } :
          anecdote
      ).sort((a, b) => a.votes < b.votes)
  }
  return state
}

export default reducer