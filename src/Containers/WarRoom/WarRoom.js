import React, {Component} from 'react'
import socket from '../../websocket'
import '../../styles/warroom.css'

class WarRoom extends Component{
  constructor(props){
    super(props)
    this.state={
      challenge: "",
      users: []
    }
    socket.on('allWarroomUsers', (users) => {
      this.setState({users: users})
    })
    socket.on('joined',(msg) => {
      let allUsers = this.state.users.concat(msg)
      this.setState({users: allUsers})
    })
  }

  async componentWillMount() {
    // NOTE there was another error tied to this that made me think it was async, it may not be needed -Dev
    let username = await this.props.user.username
    console.log(username)
    socket.emit('warroom', username)

  }

  handleRandom(){
    socket.emit('random match request',this.props.user.username)
    socket.on('connected random 1v1',(msg) => {
      console.log(msg,"CONNECTED RANDOM")
      this.props.handleOpponentName(msg)
    })
    socket.on('awaiting random 1v1',(msg) => {
      console.log(msg,"CONNECTED RANDOM")
    })
       this.props.history.history.replace('/battle')
  }

  handleSetMatch(){

  }

  users() {
    if (this.state.users[0] != null) {
    let users = this.state.users.map((user, index) => {
      return (<div className="user" key={index}>{user}</div>)
    })
      return users
    } 
    return 
  }
  
  render(){
    return(
      <div className="war-room-container">
        <button onClick={()=>{this.handleRandom()}}>random match</button>
        <button onClick={()=>{this.handleSetMatch()}}>setup match</button>
        <div className="users">
          {this.users()}
        </div>
      </div>
    )
  }
}

export default WarRoom
