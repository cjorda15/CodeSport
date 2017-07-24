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

  render() {
    return (
      <div className="destiny">
        <div className="destiny-body">
          <h2>Choose Your Destiny</h2>
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
        </div>
      </div>
    )
  }
}

export default Destiny
