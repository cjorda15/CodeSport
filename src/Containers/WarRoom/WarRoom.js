import React, {Component} from 'react'
import socket from '../../websocket'

class WarRoom extends Component{
  constructor(props){
    super(props)
    this.state={
      challenge:""
    }
  }


  handleRandom(){
    socket.emit('random match request',this.props.user.username)
    socket.on('connected random 1v1',(msg) => {
      console.log(msg,"CONNECTED RANDOM")
    })
    socket.on('awaiting random 1v1',(msg) => {
      console.log(msg,"CONNECTED RANDOM")
    })
       this.props.history.history.replace('/battle')
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
