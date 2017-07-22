import React, {Component} from 'react'

class Home extends Component{
  constructor(){
    super()
    this.state = {
      username:""
    }
  }

  render(){
    return(
      <div className="home-container">
        <h3>hello please log in</h3>
        <input
          value={this.state.username}
          placeholder="type in a username"
          onChange={(e)=>{this.setState({username:e.target.value})}}/>
      </div>
    )
  }

}

export default Home
