import React, { Component } from 'react'
import '../../styles/destiny.css'

class Destiny extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleClick(input){
    this.props.history.history.replace(input)
  }

  logOut(){
    this.props.handleLogOut()
    this.handleClick('/')
  }

  render() {
    return (
      <div className="destiny">
        <h2>Choose Your Destiny</h2>
        <div className="destiny-body">
          <button
            onClick={()=>{this.handleClick("/solo")}}>
            Interview Prep
          </button>
          <button
            onClick={()=>{this.handleClick("/warroom")}}>
            Battle
          </button>
          <button
            onClick={()=>{this.handleClick("/pair")}}>
            Pair
          </button>
          <button
            onClick={()=>{this.handleClick("/learn")}}>
            Learn
          </button>
          <button
            onClick={()=>{this.handleClick("/create_challenge")}}>
            Create Challenge
          </button>
          <button
            onClick={()=>{this.logOut()}}>
            Log Out
          </button>
        </div>
      </div>
    )
  }
}

export default Destiny
