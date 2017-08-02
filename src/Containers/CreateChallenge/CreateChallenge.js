import React, { Component } from 'react'
import '../../styles/create_challenge.css'
import NewTest from './NewTest'

class CreateChallenge extends Component{
  constructor(props){
    super(props)
    this.state = {
      challengeName: '',
      code:"",
      tests: ['','','','',''],
      description1:"",
      description2:"",
      description3:"",
      description4:"",
      description5:"",
      failedTests: [],
      testFail:false,
      runButtonClicked: false,
      value: 'beginner',
      done: false
    }
  }

  runTests() {
    if (!this.state.code) return
    this.setState({runButtonClicked: true})
    let results = []
    for (let i = 0; i < 5; i++) {
      let tester = (new Function(`${this.state.code} ; ${this.state.tests[i]}`))()
      results.push(tester)
    }
    let outcome = results.every(i => i)
    if (!outcome) {
      this.setState({testFail:true})
      let badTests = []
      results.forEach((i,index) => {
        if(!i){
           badTests.push(index)
        }
      })
      this.setState({failedTests: badTests})
    }
  }

  createTestState(event, test) {
    let tests = this.state.tests
    tests[test] = event.target.value
    this.setState({tests})
  }

  handleReroute(e){
    e.preventDefault()
    this.props.history.history.replace('/destiny')
  }

  createChallenge() {
    if (!this.state.challengeName) return
    if (this.state.failedTests.length > 1 || !this.state.runButtonClicked) return // SHOW ERROR MESSAGE
    if(!this.checkDescriptions()) return // SHOW MESSAGE SAYING MISSING DESCRIPTION
    fetch('/api/v1/challenges', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "tests": this.state.tests,
        "descriptions": [this.state.description1, this.state.description2, this.state.description3, this.state.description4, this.state.description5],
        "difficulty": this.state.value,
        "challenge_name": this.state.challengeName,
        "language": "Javascript",
        "username": this.props.user.username
      })
    })
    .then(res => res.json())
    .then(() => {
      this.setState({tests: ['','','','',''], 
                    description1: '',
                    description2: '', 
                    description3: '', 
                    description4: '', 
                    description5: '',
                    runButtonClicked: false,
                    failedTests: [],
                    code: '',
                    challengeName: '',
                    done: true
                  })
      
    })
    .catch(err => {
      console.log(err)
    })
  }

  checkDescriptions() {
    return (
      this.state.description1 !== '' &&
      this.state.description2 !== '' &&
      this.state.description3 !== '' &&
      this.state.description4 !== '' &&
      this.state.description5 !== '')
  }

  handleSelection(event) {
    this.setState({value: event.target.value})
  }

  showError() {
    if(this.state.testFail) {
      setTimeout(() =>this.setState({testFail:false}) ,4000)
      return (
        <div className="error-msg-container">
          {this.state.failedTests.map((val, i) => {
            return (
              <div className="error-msg-challenge" key={i}>
                error found on test {val+1}
              </div>
            )
          })
        }
        </div>
      )
    } else {
      return null
    }
  }

  onPost() {
    if (this.state.done) {
      return (
        <div className="complete">
          <button className="complete-button" onClick={() => this.props.history.history.replace('/destiny')}>Return to Destiny</button>  
          {/* <button>Play Your Challenge</button>   */}
          <button className="complete-button" onClick={() => this.setState({done: false})}>Make Another Challenge</button>  
        </div>
      )
    } else {
      return null
    }
  }

  createDescriptionState(e, descriptionNum) {
    let test = 'description' + descriptionNum
    this.setState({ [test]: e.target.value})
  }

  displayTests() {
    let descriptions = [this.state.description1, this.state.description2, this.state.description3, this.state.description4, this.state.description5]
    let newTests = this.state.tests.map((test, i) => {
      return (<NewTest key={i} 
                      createTestState={this.createTestState.bind(this)} 
                      testNumber={i} 
                      setState={this.setState.bind(this)} 
                      testValue={this.state.tests[i]}
                      descriptionValue={descriptions[i]}
                      createDescriptionState={this.createDescriptionState.bind(this)}
            />)
    })
    return newTests
  }

  render() {
    return (
      <div className="create-challenge-container">
        {this.onPost()}
       <h6 id="title-page">
          create challenge zone
         <button onClick={(e)=>{this.handleReroute(e)}}>back to destiny room</button>
        </h6>
        <div className="create-challenge-info">
          <input id='challenge-title' placeholder="Title of Challenge" onChange={(e) => this.setState({challengeName: e.target.value})}/>
          <select value={this.state.value} onChange={(e) => this.handleSelection(e)}>
            <option value="beginner">Beginner</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <section className="create-test-container">
          {this.displayTests()}
        </section>
        <section className="example-code-container">
        <code>
          <textarea
            className="code-example"
            type="text"
            placeholder="type in your example solutions for all your test here"
            value={this.state.code}
            onChange={(e) => {this.setState({ code: e.target.value })}}>
            </textarea>
        </code>
        <button onClick={() => this.runTests()}>Run Tests</button>
        <button onClick={() => this.createChallenge()}>Create Challenge</button>
        {this.showError()}
        </section>
      </div>
    )
  }
}

export default CreateChallenge
