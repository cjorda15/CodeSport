const battle = (state='', action) => {
  switch(action.type) {
    case 'OPPONENT_NAME':
      return action.payload
    default:
      return state
  }
}

export default battle