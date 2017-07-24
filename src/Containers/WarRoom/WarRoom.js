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
    socket.on('warRoomUsers', (msg) => {
      // this.setState({users: users})
      console.log(msg,"warroom users total recieved from server side socket")
      this.setState({users:msg})
    })
    // socket.on('joined',(msg) => {
    //   let allUsers = this.state.users.concat(msg)
    //   this.setState({users: allUsers})
    // })

  }

  async componentWillMount() {
    //maybe instead have a button that ask user to join the warroom?

    //warroom should just be inform serverside socket that someone left or entered, and whenever that occurs,
    //it should provide the same standard message to all users in the warroom who is in the warroom, I think that
    //that would be a nice standard catch all and pretty much just be heres your new fresh state after anyone enters or
    //leaves the warroom from the server side socket perspective

    // NOTE there was another error tied to this that made me think it was async, it may not be needed -Dev
    let username = await this.props.user.username
    socket.emit('user entering warroom', username)

  }

  handleRandom(){
    socket.emit('user left warroom', this.props.user.username)
    socket.emit('random match request',this.props.user.username)
    socket.on('connected random 1v1',(msg) => {
      this.props.handleOpponentName(msg)
    })
    socket.on('awaiting random 1v1',(msg) => {
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
