import React, {Component} from 'react'
import socket from '../../websocket'
import '../../styles/warroom.css'

class WarRoom extends Component{
  constructor(props){
    super(props)
    this.state={
      challenge: "",
      users: [],
      alertBattleRequest: false,
      opponentRequestingBattle: ''
    }
    socket.on('warRoomUsers', (msg) => {
      // this.setState({users: users})
      console.log(msg,"warroom users total recieved from server side socket")
      this.setState({users:msg})
    })
    socket.on('battleRequestAccepted', (msg) => {

    })

    socket.on('battleRequest', (msg) => {
      console.log(msg, 'this is the opponents battle req')
      this.setState({alertBattleRequest: true, opponentRequestingBattle: msg})
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

  handleRandom() {
    socket.emit('user left warroom', this.props.user.username)
    socket.emit('random match request',this.props.user.username)
    socket.on('connected random 1v1',(msg) => {
      this.props.handleOpponentName(msg)
    })
    socket.on('awaiting random 1v1',(msg) => {
    })
       this.props.history.history.replace('/battle')
  }

  handleSetMatch(opponentUsername) {
    if (opponentUsername === this.props.user.username) return 
    socket.emit('requestBattle', { opponent: opponentUsername, user: this.props.user.username })
  }

  users() {
    if (this.state.users[0] != null) {
    let users = this.state.users.map((user, index) => {
      return (<div onClick={() => this.handleSetMatch(`${user}`)} className="user" key={index}>{user}</div>)
    })
      return users
    }
    return
  }

  respondToBattleRequest(input) {
    if (input) {
      socket.emit('acceptBattleRequest', { opponent: opponentUsername, user: this.props.user.username })
    }
  }

  displayBattleRequest() {
    if (this.state.alertBattleRequest) {
      return (
        <div>
          <h4>{this.state.opponentRequestingBattle[0]} wants to battle!</h4>
          <div>
            <button onClick={() => this.respondToBattleRequest(true)}>Accept</button>
            <button onClick={() => this.respondToBattleRequest(false)}>Reject</button>
          </div>
        </div>
      )
    }
    return 
  }

  render(){
    return(
      <div className="war-room-container">
        <h3>{this.props.user.username}</h3>
        <button onClick={()=>{this.handleRandom()}}>random match</button>
        <button onClick={()=>{this.handleSetMatch()}}>setup match</button>
        <div className="users">
          {this.displayBattleRequest()}
          {this.users()}
        </div>
      </div>
    )
  }
}

export default WarRoom
