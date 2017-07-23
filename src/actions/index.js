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
