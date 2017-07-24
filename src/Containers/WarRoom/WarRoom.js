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
      console.log(msg,"warroom users total recieved from server side socket")
      this.setState({users:msg})
    })
    socket.on('battleRequestAccepted', (msg) => {
      this.props.handleOpponentName(msg)
      this.props.history.history.replace('/battle')

    })

    socket.on('battleRequestDeclined', (msg) => {

    })

    socket.on('battleRequest', (msg) => {
      this.setState({alertBattleRequest: true, opponentRequestingBattle: msg})
    })
  }

  async componentWillMount() {
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
      socket.emit('acceptBattleRequest', { opponent: this.state.opponentRequestingBattle, user: this.props.user.username })
      this.setState({alertBattleRequest:false})
      this.props.handleOpponentName(this.state.opponentRequestingBattle)
      this.props.history.history.replace('/battle')
    }else{
      socket.emit('declineBattleRequest',{ opponent: this.state.opponentRequestingBattle, user: this.props.user.username })
      this.setState({alertBattleRequest:false})
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
