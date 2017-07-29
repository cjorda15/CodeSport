import React, {Component} from 'react'
import '../../styles/home.css'
import socket from '../../websocket'

class Home extends Component{
  constructor(props){
    super(props)
    this.state = {
      showSignup: false,
      showLogin: false,
      showOptions: true,
      username: "",
      email: "",
      password: "",
      showError: false,
      errorUserNameTaken: false,
      loginError: false
    }
  }

  handleClick(input, e) {
    e.preventDefault()
   if (input==="create") {
     if (this.state.password.length < 6) {
       this.showError()
       return
     }
    fetch('/api/v1/account',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        username:this.state.username,
        email: this.state.email,
        password:this.state.password,
        total_score:0,
        total_matches:0,
        total_wins:0

      })
    })
    .then(res => res.json())
    .then(data => {
      this.props.handleLogin(data)
      console.log(data,"username")
      socket.emit('logged in',data)
      this.props.history.history.replace('/destiny')
    })
    .catch(err => {
      console.log(err,"error")
      this.nameOrEmailTaken()
    })
  } else {
    fetch('/api/v1/account', {
      method: "GET",
      headers: {Authorization:JSON.stringify({ username: this.state.username, password: this.state.password })}
    })  
    .then(res => (res).json())
    .then(data => {this.props.handleLogin(data)
      socket.emit('logged in', data)
      this.props.history.history.replace('/destiny')
    })
    .catch(err => {
      this.loginError()
      console.log(err,"error")
    })
  }
}

handleGoBack() {
  this.setState({ showLogin: false , showSignup: false, showOptions: true, username: "", email: "", password: ""})
}

signUp() {
  if (this.state.showSignup) {
  return (
    <form className="form-container">
    <div className="error-message">{this.state.errorUserNameTaken?"Username or email taken":null}</div>
    <input
      value={this.state.username}
      placeholder="username"
      onChange={(e) => {this.setState({ username: e.target.value })}}
    />
    <input
      value={this.state.email}
      placeholder="email"
      onChange={(e) => { this.setState({ email: e.target.value })}}
    />
    <input
      value={this.state.password}
      placeholder="password"
      onChange={(e) => { this.setState({ password: e.target.value })}}
    />
      <button onClick={(e) => { this.handleClick("create", e)}}>submit</button>
      <button onClick={() => { this.handleGoBack()}}>go back</button>
      <div className="error-message">{this.state.showError ? "password must be at least 6 characters long" : null}</div>
    </form>
  )
 }
}

showLogin() {
  if (this.state.showLogin) {
  return(
    <form className="form-container">
      <div className="error-message">{this.state.loginError?"Username/Password doesn't match":null}</div>      
      <input
        value={this.state.username}
        placeholder="username"
        onChange={(e) => {this.setState({ username: e.target.value })}}
      />
      <input
        value={this.state.password}
        placeholder="password"
        onChange={(e) => {this.setState({ password: e.target.value })}}
      />
        <button onClick={(e) => { this.handleClick("login",e) }}>submit</button>
        <button onClick={() => { this.handleGoBack() }}>go back</button>
    </form>
  )
 }
}

  showOptions() {
    if (this.state.showOptions) {
      return (
        <div className="options-container">
          <button onClick={() => { this.setState({ showSignup: true, showOptions: false })}}>sign up</button>
          <button onClick={() => { this.setState({ showLogin: true, showOptions: false })}}>log in</button>
        </div>
      )
    }
  }

  showError() {
    this.setState({ showError: true })
    setTimeout(() => {this.setState({ showError: false })}, 4000)
  }

  nameOrEmailTaken() {
    this.setState({ errorUserNameTaken: true })
    setTimeout(() => {this.setState({ errorUserNameTaken: false })}, 4000)
  }

  loginError() {
    this.setState({ loginError: true })
    setTimeout(() => {this.setState({ loginError: false })}, 4000)
  }

  render(){
    return(
      <div className="home-container">
        <p>WELCOME TO THE SPORT OF CODE</p>
        {this.showLogin()}
        {this.signUp()}
        {this.showOptions()}
      </div>
    )
  }

}

export default Home
