export const login = (input) =>{
  return {
    type:"LOGIN",
    payload:input
  }
}

export const logout = () => {
  return {
    type:"LOGOUT"
  }
}

export const opponentName = (name) => {
  return {
    type: "OPPONENT_NAME",
    payload:name
  }
}

export const clearOpponent = () => {
  return {
    
  }

}
