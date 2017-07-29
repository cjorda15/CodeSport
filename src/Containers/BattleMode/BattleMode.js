import React, { Component } from 'react'
import socket from '../../websocket'
import '../../styles/battlemode.css'

class BattleMode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lineNumber: 1,      opponentsPoints:0,
      text:"",
      testsStatus: [],
      currentQuestion: 0,
      gameover:false,
      description: [
        "make a object constructor with the property name having a value of chris",
        "make a method named shout that when run, will have the user shout his name followed by is shouting (ex:chris is shouting)",
        "make a method named changeName that when run will allow the argument to be the object propety name's value to be reassigned",
        "make it so that when a object is intinitated with this object constructor, it can have the first argument be assigned to the name's property's value"
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

    socket.on('challenger question',(msg) => {
      this.setState({opponentsPoints:msg})
      if(msg==this.state.questions.length){
        this.setState({gameover:true})
      }
    })
  }
  getCode(e) {
    if (e.key === 'Enter') {
      let addLine = this.state.lineNumber + 1
      this.setState({lineNumber: addLine})
    }
    if(!e) return
    let text = e.target.innerText
    this.setState({text: text})
  }

  make(){
    if(this.state.gameover||!this.state.text)return

    let results = []
    let runTill = this.state.currentQuestion
    runTill+=1
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

  gameover(){
    if(this.state.gameover){
      return(
        <div className="gameover-message">
          GAMEOVER
          <button onClick={(e)=>{this.handleRoute(e)}}>back to war</button>
        </div>
      )
    }
  }

  handleRoute(e){
    this.props.handleClearOpponent()
    e.preventDefault()
    this.props.history.history.replace('/warroom')
  }

  render(){
    return (
      <div className="app">
        <div id="left-side">
          <div id="terminal" >
            <div className="line-wrapper">
              <div><div className="line-num">{this.addLine()}</div></div>
              <p className="line" onKeyUp={(e) => {this.getCode(e)}} contentEditable={true}></p>
            </div>
          </div>
          <div id="run-button-div">
            <button id="run-button" onClick={() => this.make()}>Run</button>
          </div>
         </div>
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
              <p className="current-question">{this.state.description[this.state.currentQuestion]}</p>
            </div>
         </div>
         {this.gameover()}
        <pre id="code"></pre>
        <span id="code-container"></span>
      </div>
  )}
}


export default BattleMode
