import React, {Component} from 'react'

class Home extends Component{
  constructor(props){
    super(props)
    this.state = {
      username:"",
      password:""
    }
  }

  handleClick(input){
    if(input==="create"){
    fetch('/api/v1/account',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        username:this.state.username,
        password:this.state.password
      })
    })
    .then(res => res.json())
    .then(data => this.props.handleLogin(data),
          this.props.history.history.replace('/warroom')
      )
    .catch(err => console.log(err,"error"))
  }else{
    fetch('/api/v1/account',{
      method:"GET",
      headers:{Authorization:JSON.stringify({username:this.state.username,password:this.state.password})}
  })
  .then(res => (res).json())
  .then(data => this.props.handleLogin(data),
  this.props.history.history.replace('/warroom')
  )
  .catch(err => console.log(err,"error"))
}
}
  render(){
    return(
      <div className="home-container">
        <h3>hello please log in</h3>
        <input
          value={this.state.username}
          placeholder="username"
          onChange={(e)=>{this.setState({username:e.target.value})}}/>
        <input
          value={this.state.password}
          placeholder="password"
          onChange={(e)=>{this.setState({password:e.target.value})}}/>
        <button onClick={(e)=>{this.handleClick("create")}}>submit new user</button>
        <button onClick={(e)=>{this.handleClick("login")}}>login</button>
      </div>
    )
  }

}

export default Home
