const battleRequest = (state=false, action) => {
  switch(action.type) {
    case 'ACCEPT_REQUEST':
      return true
    case 'CLEAR_OPPONENT':
      return false
    default:
      return state
  }
}

export default battleRequest
