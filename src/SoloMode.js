import React, { Component } from 'react'
import './styles/solomode.css'


class SoloMode extends Component {
  constructor() {
    super()
    this.state = {
      text:"",
      currentQuestion: 0,
      description:["make a object constructor with the property name having a value of chris","make a method named shout that when run, will have the user shout his name followed by is shouting (ex:chris is shouting)","make a method named changeName that when run will allow the argument to be the object propety name's value to be reassigned","make it so that when a object is intinitated with this object constructor, it can have the first argument be assigned to the name property's value"],
      questions : [
        function test1(arg,question,setState){
          if(arg == "error"){
            console.log("sorry error in creating user Function")
            return
          }
          const test = new arg()
          if(test.name==="chris"){
            console.log("WINNER")
            let updateQuestion = question+1
            setState({currentQuestion:updateQuestion})
          }else{
            console.log("try again")
          }
      },
      function test2(arg,question,setState){
        if(arg == "error"){
          console.log("sorry error in creating user Function")
          return
        }
        const test = new arg()
        if(!test.shout) return "please make the shout method for the object constructor"
        if(test.shout()==="chris is shouting"){
          console.log("another win!")
          let updateQuestion = question+1
          setState({currentQuestion:updateQuestion})
        }else{
          console.log("woops no good!")
        }
      },
      function test3(arg,question,setState){
        if(arg == "error"){
          console.log("sorry error in creating user Function")
          return
        }
        const test = new arg()
        test.changeName("rob")
        if(test.name == "rob"){
          let updateQuestion = question+1
          setState({currentQuestion:updateQuestion})
          console.log("win win win")
        }else{
          console.log("Bummmer")
        }

      },
      function test4(arg){
        if(arg == "error"){
          console.log("sorry error in creating user Function")
          return
        }
        const test = new arg("j")
        if(test.name=="j"){
          console.log("game over you bastard")
        }else{
          console.log("but why!!!")
        }

      }
      ]
    }
  }



  getCode(e) {
    if(!e) return
    let text = e.target.innerText
    this.setState({text: text})
  }

  createFunction(arg){
   if(arg.slice(0,8)!=="function")return "error";
   const splitArg =  arg.split("")
  //  const name = splitArg.splice(arg.indexOf("ion"),arg.indexOf("(")-arg.indexOf("ion"))
   const args = splitArg.splice(splitArg.indexOf("(")+1,(splitArg.indexOf(")") - splitArg.indexOf("("))-1).filter(val=> val!==",")
   const body = splitArg.splice(splitArg.indexOf("{")+1,splitArg.length-1)
   const useBody = body.splice(0,body.length-2).join('')
   return new Function(args,useBody)
}


  make() {
    if (!this.state.text) return
    const userFunction = this.createFunction(this.state.text)
    const question = this.state.questions[this.state.currentQuestion]
    question(userFunction,this.state.currentQuestion,this.setState.bind(this))
  }

  render() {
    return (
      <div className="app">
        <div id="left-side">
          <div id="terminal" onKeyUp={(e) => {this.getCode(e)}} contentEditable={true}></div>
          <div id="run-button-div">
            <button id="run-button" onClick={() => this.make()}>Run</button>
          </div>
         </div>
         <div id="right-side">
            <div id="repl"></div>
            <div id="scoreboard"></div>
         </div>
        <pre id="code"></pre>
      </div>
    );
  }
}

export default SoloMode
