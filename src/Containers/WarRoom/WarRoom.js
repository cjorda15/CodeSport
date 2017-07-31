import React, {Component} from 'react'
import socket from '../../websocket'
import '../../styles/warroom.css'

class WarRoom extends Component{
  constructor(props){
    super(props)
    this.state={
      challenge: "",
      users: [],
      opponentRequestingBattle: [],
      showDecline:false,
      userDecline:"",
      requestError:false
    }

    socket.on('warRoomUsers', (msg) => {
      this.setState({users:msg})
      console.log(msg,"msg in warrom on users available")
    })

    socket.on('battleRequestAccepted', (msg) => {
      this.props.handleAcceptRequest()
      this.props.handleOpponentName(msg)
      this.props.history.history.replace('/battle')

    })

    socket.on('sendChallenge', (msg) => {
      this.props.handleGetChallenge(msg)
    })

    socket.on('battleRequestDeclined', (msg) => {
      this.setState({showDecline:true, userDecline:msg})
      setTimeout(() => { this.setState({showDecline:false})}, 4000)
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
    if (opponentUsername === this.props.user.username){
      this.errorMessage()
      return
    }
    socket.emit('requestBattle', { opponent: opponentUsername, user: this.props.user.username })
  }

  users() {
    if (this.state.users[0] != null) {
    let users = this.state.users.map((user, index) => {
      return (<div className="user" key={index}>
                <button onClick={() => this.handleSetMatch(`${user}`)}>
                  {user}
                </button>
                <button id="stats-btn" onClick={()=>{console.log("bam")}}>see stats</button>
              </div>)
    })
      return users
    }
    return
  }

  respondToBattleRequest(input,opponent) {
    if (input) {
      this.props.handleAcceptRequest()
      socket.emit('acceptBattleRequest', { opponent: opponent, user: this.props.user.username })
      this.props.handleOpponentName(this.state.opponentRequestingBattle)
      this.props.history.history.replace('/battle')
      this.setState({opponentRequestingBattle:[]})
     }else{
      socket.emit('declineBattleRequest',{ opponent: opponent, user: this.props.user.username })
      let updateOpponents = this.state.opponentRequestingBattle.slice(0,this.state.opponentRequestingBattle.length)
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
    socket.emit('user left warroom', this.props.user.username)
    e.preventDefault()
    this.props.history.history.replace('/destiny')
  }

  errorMessage(){
    this.setState({requestError:true})
    setTimeout(() => { this.setState({requestError:false})}, 4000)
  }

  render(){
    return(
      <div className="war-room-container">
        <h3>Prepare yourself {this.props.user.username}!</h3>
        <div className="war-room-btn-container">
          <button onClick={()=>{this.handleRandom()}}>random match</button>
          <button  onClick={()=>{this.handleSetMatch()}}>setup match</button>
          <button onClick={(e)=>{this.handleRoute(e)}}>back to destiny room</button>
        </div>
        <div className="battle-request-container">
          {this.displayBattleRequest()}
        </div>
        {this.state.showDecline ?
         <div className="decline-battle-request">Unfortunaly {this.state.userDecline} is too scared to play with you right for now</div>
          :
         null
        }
        {this.state.requestError ?
          <div className="request-error">You can not request yourself to be challenged silly bear, try solo mode in the destiny room if you want to play with yourself</div>
           :
          null}
        <div className="select-user-message-container">
          <div className="select-user-message">
           select a user to challenge to a battle
          </div>
        </div>
        <div className="users">
          {this.users()}
        </div>
      </div>
    )
  }
}

export default WarRoom
