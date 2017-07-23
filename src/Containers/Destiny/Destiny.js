import React, { Component } from 'react'

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
      <div>
        <button
          onClick={()=>{this.handleClick("/solo")}}>
          Lone Wolf
        </button>
        <button
          onClick={()=>{this.handleClick("/warroom")}}>
          War Room
        </button>
      </div>
    )
  }
}

export default Destiny
