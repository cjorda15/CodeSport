import React, { Component } from 'react';
import './styles/App.css';
import { Route, Switch } from 'react-router-dom'
import SoloMode from './SoloMode'
import Home from './Home'
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
          <Route exact path='/solo' render={() => {
            return (
              <SoloMode/>
            )
          }}/>
          <Route exact path='/' render={() => {
            return(<Home/>)
          }}/>
        </Switch>
      </section>
    )
  }
}

export default App;
