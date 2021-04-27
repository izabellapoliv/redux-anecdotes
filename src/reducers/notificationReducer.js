export const setNotification = (notification, timeout) => {
  return async dispatch => {
    dispatch(notificationCreate(notification))
    await setTimeout(() => notificationRemove(), timeout * 1000)
    return notificationRemove()
  }
}
const notificationCreate = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}
const notificationRemove = () => {
  return {
    type: 'SET_NOTIFICATION',
    notification: '',
  }
}

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export default reducer