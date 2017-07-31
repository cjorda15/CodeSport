import React, { Component } from 'react'
import '../../styles/create_challenge.css'

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
      value: 'beginner'
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
    .then(data => {
      // NOTE should we have this redirect automatically or should we give them an option to play their challenge?
      // this.props.history.replace('/')
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

  showError(){
    if(this.state.testFail){
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
    }else{
      return null
    }
  }

  render(){
    return(
      <div className="create-challenge-container">
       <h6 id="title-page">
          create test zone
         <button onClick={(e)=>{this.handleReroute(e)}}>back to destiny room</button>
        </h6>
        <div className="create-challenge-info">
          <input placeholder="Title of Challenge" onChange={(e) => this.setState({challengeName: e.target.value})}/>
          <select value={this.state.value} onChange={(e) => this.handleSelection(e)}>
            <option value="beginner">Beginner</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <section className="create-test-container">
       <code>
        <h6> test 1 code</h6>
         <textarea
          className="code-test"
          type="text"
          placeholder="type in your test 1"
          value={this.state.tests[0]}
          onChange={(e) => this.createTestState(e, 0)}>
         </textarea>
          <h6>write test 1 description here</h6>
        <textarea
          className="code-description"
          type="text"
          placeholder="test description"
          value={this.state.description1}
          onChange={(e) => {this.setState({description1:e.target.value})}}>
        </textarea>
       </code>
       <code>
        <h6> test 2 code</h6>
         <textarea
           className="code-test"
           type="text"
           placeholder="type in your test 2"
           value={this.state.tests[1]}
           onChange={(e) => this.createTestState(e, 1)}>
         </textarea>
           <h6>write test 2 description here</h6>
           <textarea
             className="code-description"
             type="text"
             placeholder="test description"
             value={this.state.description2}
             onChange={(e)=>{this.setState({description2:e.target.value})}}>
           </textarea>
          </code>
          <code>
          <h6> test 3 code</h6>
            <textarea
              className="code-test"
              type="text"
              placeholder="type in your test 3"
              value={this.state.tests[2]}
              onChange={(e) => this.createTestState(e, 2)}>
            </textarea>
            <h6>write test 3 description here</h6>
            <textarea
              className="code-description"
              type="text"
              placeholder="test description"
              value={this.state.description3}
              onChange={(e)=>{this.setState({description3:e.target.value})}}
              ></textarea>
          </code>
          <code>
          <h6> test 4 code</h6>
            <textarea
              className="code-test"
              type="text"
              placeholder="type in your test 4"
              value={this.state.tests[3]}
              onChange={(e) => this.createTestState(e, 3)}
              ></textarea>
            <h6>write test 4 description here</h6>
            <textarea
              className="code-description"
              type="text"
              placeholder="test description"
              value={this.state.description4}
              onChange={(e)=>{this.setState({description4:e.target.value})}}
              ></textarea>
          </code>
          <code>
          <h6> test 5 code</h6>
            <textarea
              className="code-test"
              type="text"
              placeholder="type in your test 5"
              value={this.state.tests[4]}
              onChange={(e) => this.createTestState(e, 4)}
              ></textarea>
            <h6>write test 5 description here</h6>
            <textarea
              className="code-description"
              type="text"
              placeholder="test description"
              value={this.state.description5}
              onChange={(e)=>{this.setState({description5:e.target.value})}}>
            </textarea>
          </code>
        </section>
        <section className="example-code-container">
        <code>
          <textarea
            className="code-example"
            type="text"
            placeholder="type in your example solutions for all your test here"
            value={this.state.code}
            onChange={(e)=>{this.setState({code:e.target.value})}}>
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
