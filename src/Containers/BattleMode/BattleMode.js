import React, { Component } from 'react'
import socket from '../../websocket'
import '../../styles/battlemode.css'
const ReactCountdownClock = require("react-countdown-clock")

class BattleMode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startGame:false,
      lineNumber: 1,
      opponentsPoints:0,
      text:"",
      challengerLeft:false,
      testsStatus: [],
      currentQuestion: 0,
      showTimer:true,
      gameover:false,
      showCode:false,
      challengerCode:"",
      description: [
        "make a function object constructor with the declared name being 'Person' with the property name having a value of chris",
        "make a method for the function object constructor named shout that when called, will have the user shout his name followed by is shouting (ex:chris is shouting)",
        "make a method named changeName that when run will allow the argument to reassign the object propety name's value",
        "make it so that when a object is intinitated with this function object constructor, it can have the first argument be assigned to the name's property's value"
      ],
      questions : [
     `let test = new Person()
        if(test.name==="chris"){
          return true
        }else{
          return false
        }`,

      ` let test2 = new Person()
        if(test2.shout()==="chris is shouting"){
          return true
        }else{
        return false
        }`,
      `
        let test3 = new Person()
        if(!test3.changeName) return false
        test3.changeName("rob")
        if(test3.name == "rob"){
        return true
        }else{
        return false
        }`,
      ` let test4 = new Person("j")
        if(test4.name=="j"){
        return true
        }else{
        return  false
        }`
      ]
    }
    socket.on('connected random 1v1',()=>{
      this.setState({startGame:true})
    })
    socket.on('challenger left', () => {
      this.setState({gameover:true,challengerLeft:true})
    })

    socket.on('battleRequestAccepted',() => {
      this.setState({startGame:true})
    })

    socket.on('challenger question',(msg) => {
      this.setState({opponentsPoints:msg})
      if(msg==this.state.questions.length){
        this.setState({gameover:true})
        this.handleApiCall("+ 0")
        socket.emit('send code',{
          code:this.state.text,
          challenger:this.props.battle
        })
      }
    })

    socket.on('challenger code', (msg) => {
      this.setState({challengerCode:msg})
    })
  }

  getCode(e) {
    if (e.key === 'Enter') {
      if(this.state.lineNumber==27) return
      let addLine = this.state.lineNumber + 1
      this.setState({lineNumber: addLine})
    }
    if(!e) return
    let text = e.target.innerText
    this.setState({text: text})
  }

  make(){
    if (this.state.gameover||!this.state.text)return
    if(!this.props.battle||!this.state.startGame)return

    const results = []
    const runTill = this.state.currentQuestion+1
    for(let i =0;i<runTill;i++){
      let tester = (new Function(`${this.state.text} ; ${this.state.questions[i]}`))()
      results.push(tester)
     }
    let outcome = results.every(i=> i)
      if(!outcome){
        let failedTest = []
        for(let i = 0; i<results.length; i++){
          if(!results[i]){
            this.setState({currentQuestion:i})
            socket.emit("current question",{question:i,challenger:this.props.battle})
            break;
          }
        }
      }else{
      let updateQuestion = this.state.currentQuestion+1
      this.setState({currentQuestion:updateQuestion})
      socket.emit("current question",{question:updateQuestion,challenger:this.props.battle})
      if(updateQuestion==this.state.questions.length){
        this.setState({gameover:true})
        this.handleApiCall("+ 1")
        socket.emit('send code',({
          code:this.state.text,
          challenger:this.props.battle
        })
       )
      }
     }
   }

  addLine() {
    let test = []
    for (let i = 1; i <= this.state.lineNumber; i++) {
      let newLine = document.createElement('p')
      newLine.innerText += i
      test.push(newLine)
    }
    let test2 = test.map((line,id) => {
      return <p key={id}>{line.innerHTML}</p>
    })
    return test2
  }

  handleRoute(e){
    this.props.handleClearOpponent()
    e.preventDefault()
    this.props.history.history.replace('/warroom')
  }

  handleApiCall(win){
    const d     = new Date()
    const month = d.getMonth()+1
    const day   = d.getDate()
    const year  = d.getFullYear()
    const score = this.state.currentQuestion==0?
          0 :this.state.currentQuestion+1

    fetch('/api/v1/score', {
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
          username:`${this.props.user.username}`,
          score: score,
          win: win,
          date: month + " " + day + " " + year
      })
    })
  }

  gameover(){
    if(this.state.gameover){
      return(
        <div className="gameover-message">
        GAMEOVER
        {this.state.challengerLeft?
          <div>challenger has fled the battle</div>
            :
          <button onClick={()=>{this.handleCodeShow(true)}}>I want to see that other code!</button>
        }
        <button onClick={(e)=>{this.handleRoute(e)}}>back to war</button>
        </div>
      )
    }
  }

  handleCodeShow(input){
    this.setState({showCode:input})
  }

  showCode(){
  return  this.state.showCode ?
      <div className="challenger-code">
       <div>{this.state.challengerCode}</div>
       <button onClick={()=>{this.handleCodeShow(false)}}>close</button>
      </div>
        :
       null
    }

    beginTimer(){
      if(this.state.timer==0)return
    setTimeout(function() {
        this.setState({timer: 5})
    }.bind(this), 1000);
  }

  render(){
    return (
      <div className="app">
 {!this.state.startGame&&this.state.showTimer?null:
      <ReactCountdownClock seconds={5}
                     color="#e8cc2e"
                     alpha={0.9}
                     size={500}
                     onComplete={this.setState({showTimer:false})} />}
        <div id="left-side">
         {!this.state.startGame?null:
          <div id="terminal" >
            <div className="line-wrapper">
              <div><div className="line-num">{this.addLine()}</div></div>
              <p className="line" onKeyUp={(e) => {this.getCode(e)}} contentEditable={true}></p>
            </div>
          </div>}
          {!this.state.startGame?null:
          <div id="run-button-div">
            <button id="run-button" onClick={() => this.make()}>Run</button>
          </div>}
         </div>
         {this.state.startGame?null:<div className="waiting-msg">waiting on challenger</div>}
         <div id="right-side">
            <div id="repl">
             >
            </div>
            <div id="scoreboard">
              <h4 className="scoreboard-title">Scoreboard</h4>
              <div className="scores">
                <p>Your Score: {this.state.currentQuestion}</p>
                <p>Opponents Score: {this.state.opponentsPoints}</p>
              </div>
              {!this.state.startGame?null:
              <p className="current-question">{this.state.description[this.state.currentQuestion]}</p>}
            </div>
         </div>
         {this.gameover()}
         {this.showCode()}
      </div>
  )}
}


export default BattleMode
