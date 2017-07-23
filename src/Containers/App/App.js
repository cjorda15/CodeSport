import React, { Component } from 'react';
import '../../styles/App.css';
import { Route, Switch } from 'react-router-dom'
import SoloMode from '../SoloMode/SoloModeContainer'
import Home from '../Home/HomeContainer'
import WarRoom from '../WarRoom/WarRoomContainer'
import Destiny from '../Destiny/DestinyContainer'
import BattleMode from '../WarRoom/WarRoomContainer'
const socket = io({transports: ['websocket'], upgrade: false});

socket.on('userConnection', (msg) => {
  console.log(msg,"MESSAGE FROM SERVER!!!!!!")
  socket.emit('hello',"sup from " )
})

socket.on('hi', (msg) => {
  console.log(msg,"MESSAGE FROM OTHER USER")
})

class App extends Component {
  render() {
    return (
      <section>
        <Switch>
          <Route exact path='/destiny' render={(history) => {
            return (<Destiny history={history}/>)
            }}/>
          <Route exact path='/warroom' render={(history) => {
            return (<WarRoom history={history}/>)
          }}/>
          <Route exact path='/solo' render={(history) => {
            return (<SoloMode history={history}/>)
          }}/>
          <Route exact path='/battle' render={(history) => {
            return (<BattleMode history={history}/>)
          }}/>
          <Route exact path='/' render={(history) => {
            return(<Home history={history}/>)
          }}/>
        </Switch>
      </section>
    )
  }
}

export default App;
