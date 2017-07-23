import React, {Component} from 'react'

class WarRoom extends Component{
  constructor(props){
    super(props)
    this.state={
      challenge:""
    }
  }


  handleRandom(){
    this.props.history.history.replace('/solo')

  }

  handleSetMatch(){

  }

  render(){
    return(
      <div className="war-room-container">
        <button onClick={()=>{this.handleRandom()}}>random match</button>
        <button onClick={()=>{this.handleSetMatch()}}>setup match</button>
        <input
        placeholder="type in user you want to challenge"
        value={this.state.challenge}
        onChange={(e)=>{this.setState({challenge:e.target.value})}}
        />
      </div>
    )
  }
}

export default WarRoom
