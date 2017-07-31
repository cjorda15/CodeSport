const getChallenge = (state=[], action) => {
  switch(action.type) {
    case 'GET_CHALLENGE':
      return action.payload
    default: 
      return state
  }
}

export default getChallenge