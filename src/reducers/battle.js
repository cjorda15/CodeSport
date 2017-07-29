const battle = (state='', action) => {
  switch(action.type) {
    case 'OPPONENT_NAME':
      return action.payload
    case 'CLEAR_OPPONENT':
      return ""
    default:
      return state
  }
}

export default battle
