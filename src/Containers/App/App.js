import React, { Component } from 'react';
import '../../styles/App.css';
import { Route, Switch, Redirect } from 'react-router-dom'
import SoloMode from '../SoloMode/SoloModeContainer'
import Home from '../Home/HomeContainer'
import WarRoom from '../WarRoom/WarRoomContainer'
import Destiny from '../Destiny/DestinyContainer'
import BattleMode from '../BattleMode/BattleModeContainer'

//redirect to home Component if no

class App extends Component {
  render() {
    return (
      <section>
        <Switch>
          <Route exact path='/destiny' render={(history) => {
            return !this.props.user.username?
            <Redirect to="/"/>
              :
             <Destiny history={history}/>
            }}/>
          <Route exact path='/warroom' render={(history) => {
          return !this.props.user.username?
            <Redirect to="/"/>
              :
            <WarRoom history={history}/>
          }}/>
          <Route exact path='/solo' render={(history) => {
            return !this.props.user.username?
            <Redirect to="/"/>
              :
            <SoloMode history={history}/>
          }}/>
          <Route exact path='/battle' render={(history) => {
            return !this.props.user.username?
            <Redirect to="/"/>
              :
             <BattleMode history={history}/>
          }}/>
          <Route exact path='/' render={(history) => {
            return<Home history={history}/>
          }}/>
        </Switch>
      </section>
    )
  }
}

export default App;
