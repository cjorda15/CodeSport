import React, { Component } from 'react'
import socket from '../../websocket'
import '../../styles/battlemode.css'

class BattleMode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lineNumber: 1,
      myPoints:0,
      opponentsPoints:0,
      text:"",
      testsStatus: [],
      currentQuestion: 0,
      description: [
        "make a object constructor with the property name having a value of chris",
        "make a method named shout that when run, will have the user shout his name followed by is shouting (ex:chris is shouting)",
        "make a method named changeName that when run will allow the argument to be the object propety name's value to be reassigned",
        "make it so that when a object is intinitated with this object constructor, it can have the first argument be assigned to the name's property's value"
      ],
      questions : [
        function test1(arg){
          if(arg == "error"){
            console.log("sorry error in creating user Function")
            return false
          }
          const test = new arg()
          if(test.name==="chris"){
            return true
          }else{
            return
          }
      },
      function test2(arg){
        if(arg == "error"){
          console.log("sorry error in creating user Function")
          return
        }
        const test = new arg()
        if(!test.shout) return "please make the shout method for the object constructor"
        if(test.shout()==="chris is shouting"){
          return true
        }else{
          return false
        }
      },
      function test3(arg){
        if(arg == "error"){
          console.log("sorry error in creating user Function")
          return
        }
        const test = new arg()
        if(!test.changeName) return "please make the changeName method for the object constructor"
        test.changeName("rob")
        if(test.name == "rob"){
          return true
        }else{
          return false
        }

      },
      function test4(arg){
        if(arg == "error"){
          console.log("sorry error in creating user Function")
          return
        }
        const test = new arg("j")
        if(test.name=="j"){
          return true
        }else{
          return false
        }
      }
      ]
    }

    socket.on('challenger point',() => {
      this.challengerPoint()
    })
  }

  getCode(e) {
    if (e.key === 'Enter') {
      let addLine = this.state.lineNumber + 1
      this.setState({lineNumber: addLine})
    }
    if(!e) return //Note do we still need this?
    let text = e.target.innerText
    this.setState({text: text})
  }

  createFunction(arg){
   if(arg.slice(0,8)!=="function")return "error";
   const splitArg =  arg.split("")
   const userArguments = splitArg.splice(splitArg.indexOf("(")+1,(splitArg.indexOf(")") - splitArg.indexOf("("))-1).join("")
   const body = splitArg.splice(splitArg.indexOf("{")+1,splitArg.length-1)
   const useBody = body.splice(0,body.length-2).join('')
   return new Function(userArguments,useBody)
  }


  make() {
    if (!this.state.text) return
    const userFunction = this.createFunction(this.state.text)
    let test = this.state.questions
    let currentQuestion = this.state.currentQuestion
    currentQuestion+=1
    let outcome = this.checkTestResults(userFunction, test.slice(0, currentQuestion))
    this.test(outcome)
  }

  test(outcome) {
    if(outcome){
      socket.emit("point won",this.props.battle)
    }
  }

  checkTestResults(userFunction, questions) {
    let results = questions.map(question => {
      return question(userFunction)
    })
    this.setState({testsStatus: results})
      if(!results.every(result => result)){
        results.find((result,index) => {
        if(!result){
          this.setState({currentQuestion:index})
        }
      })
      }else{
        let updateQuestion = this.state.currentQuestion
        let updateMyPoints = this.state.myPoints
        updateQuestion+=1
        updateMyPoints+=1
        this.setState({currentQuestion:updateQuestion,myPoints:updateMyPoints})
      }
    return results.every(result => result)
  }

 challengerPoint() {
   const updateChallegerPoints = this.state.opponentsPoints+1
    this.setState({opponentsPoints:updateChallegerPoints})
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

  render() {
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
                <p>Your Score: {this.state.myPoints}</p>
                <p>Opponents Score: {this.state.opponentsPoints}</p>
              </div>
              <p className="current-question">{this.state.description[this.state.currentQuestion]}</p>
            </div>
         </div>
        <pre id="code"></pre>
      </div>
  )}
}

export default BattleMode
