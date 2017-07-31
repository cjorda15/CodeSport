import React, { Component } from 'react'
// import '../../styles/solomode.css'
import '../../styles/battlemode.css'
//pretty much the same minus the additional elements in battleroom

class SoloMode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startGame: true,
      lineNumber: 1,
      text:"",
      testsStatus: [],
      currentQuestion: 0,
      gameover:false,
      description: [],
      questions : []
    }

  }

  componentWillMount(){
    setTimeout(()=>{this.setState({
      description:this.props.getChallenge[0].descriptions,
      questions:this.props.getChallenge[0].tests})},10)
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
            break;
          }
        }
      }else{
      let updateQuestion = this.state.currentQuestion+1
      this.setState({currentQuestion:updateQuestion})
      if(updateQuestion==this.state.questions.length){
        this.setState({gameover:true})
        //make api call here to update score
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
    e.preventDefault()
    this.props.history.history.replace('/solo')
  }

  // handleApiCall(win){
  //   const d     = new Date()
  //   const month = d.getMonth()+1
  //   const day   = d.getDate()
  //   const year  = d.getFullYear()
  //   const score = this.state.currentQuestion==0?
  //         0 :this.state.currentQuestion+1
  //
  //   fetch('/api/v1/score', {
  //     method:'PUT',
  //     headers:{'Content-Type':'application/json'},
  //     body:JSON.stringify({
  //         username:`${this.props.user.username}`,
  //         score: score,
  //         win: win,
  //         date: month + " " + day + " " + year
  //     })
  //   })
  // }

  gameover(){
    if(this.state.gameover){
      return(
        <div className="gameover-message">
         GAMEOVER
        <button onClick={(e)=>{this.handleRoute(e)}}>back to solo</button>
        </div>
      )
    }
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
         <div className="waiting-msg">waiting on challenger</div>
         <div id="right-side">
            <div id="repl">
             >
             <button onClick={()=>{this.handleRoute()}}>Exit to War Room</button>
            </div>
            <div id="scoreboard">
              <h4 className="scoreboard-title">Scoreboard</h4>
              <div className="scores">
                <p>Your Score: {this.state.currentQuestion}</p>
              </div>
              <p className="current-question">{this.state.description[this.state.currentQuestion]}</p>
            </div>
         </div>
         {this.gameover()}
      </div>
  )}
}

export default SoloMode
