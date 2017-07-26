import React, {Component} from 'react'
import socket from '../../websocket'
import '../../styles/warroom.css'

class WarRoom extends Component{
  constructor(props){
    super(props)
    this.state={
      challenge: "",
      users: [],
      opponentRequestingBattle: []
    }
    socket.on('warRoomUsers', (msg) => {
      this.setState({users:msg})
    })
    socket.on('battleRequestAccepted', (msg) => {
      this.props.handleOpponentName(msg)
      this.props.history.history.replace('/battle')

    })

    socket.on('battleRequestDeclined', (msg) => {

    })

    socket.on('battleRequest', (msg) => {
      let opponent = this.state.opponentRequestingBattle.slice(0,this.state.opponentRequestingBattle.length)
      opponent.unshift(msg)
      this.setState({opponentRequestingBattle: opponent})
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

  respondToBattleRequest(input,opponent) {
    if (input) {
      socket.emit('acceptBattleRequest', { opponent: opponent, user: this.props.user.username })
      this.props.handleOpponentName(this.state.opponentRequestingBattle)
      this.props.history.history.replace('/battle')
      this.setState({opponentRequestingBattle:[]})
      //might cause an error setting opponet state back to a empty array
    }else{
      socket.emit('declineBattleRequest',{ opponent: opponent, user: this.props.user.username })
      let updateOpponents = this.state.opponentRequestingBattle.slice(0,this.state.opponentRequestingBattle.length)
      console.log(opponent,"OPPOENT")
      updateOpponents.splice(updateOpponents.indexOf(opponent),1)
      this.setState({opponentRequestingBattle:updateOpponents})
    }
  }

  displayBattleRequest() {
    if (this.state.opponentRequestingBattle.length) {
      return this.state.opponentRequestingBattle.map((opponent,i) => {
        return (
          <div key={i} className="battle-request">
            <h4>{opponent} wants to battle!</h4>
            <div>
            <button onClick={() => this.respondToBattleRequest(true,opponent)}>Accept</button>
            <button onClick={() => this.respondToBattleRequest(false,opponent)}>Reject</button>
            </div>
          </div>
        )
      })
    }
    return
  }

  handleRoute(e){
    e.preventDefault()
    this.props.history.history.replace('/destiny')
  }

  render(){
    return(
      <div className="war-room-container">
        <h3>Prepare yourself {this.props.user.username}!</h3>
        <div className="war-room-btn-container">
          <button onClick={()=>{this.handleRandom()}}>random match</button>
          <button  onClick={()=>{this.handleSetMatch()}}>setup match
          </button>
          <button onClick={(e)=>{this.handleRoute(e)}}>back to destiny room</button>
        </div>
        <div className="battle-request-container">
          {this.displayBattleRequest()}
        </div>
        <div className="users">
          {this.users()}
        </div>
      </div>
    )
  }
}

export default WarRoom
