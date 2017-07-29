import React, { Component } from 'react'
import '../../styles/create_challenge.css'


class CreateChallenge extends Component{
  constructor(props){
    super(props)
    this.state = {
      code:"",
      test1:"",
      test2:"",
      test3:"",
      test4:"",
      test5:"",
      description1:"",
      description2:"",
      description3:"",
      description4:"",
      description5:"",
    }
  }
  render(){
    return(
      <div className="create-challenge-container">
        <section className="create-test-container">
          <code>
          <h6> test 1 code</h6>
            <input
              className="code-test"
              type="text"
              placeholder="type in your test 1"
              value={this.state.test1}
              onChange={(e)=>{this.setState({test1:e.target.value})}}
              />
              <h6>write test 1 description here</h6>
              <input
                className="code-example"
                type="text"
                placeholder="test description"
                value={this.state.description1}
                onChange={(e)=>{this.setState({description1:e.target.value})}}
                />
          </code>
          <code>
          <h6> test 2 code</h6>
            <input
              className="code-test"
              type="text"
              placeholder="type in your test 2"
              value={this.state.test2}
              onChange={(e)=>{this.setState({test2:e.target.value})}}
              />
            <h6>write test 2 description here</h6>
            <input
              className="code-example"
              type="text"
              placeholder="test description"
              value={this.state.description2}
              onChange={(e)=>{this.setState({description2:e.target.value})}}
              />
          </code>
          <code>
          <h6> test 3 code</h6>
            <input
              className="code-test"
              type="text"
              placeholder="type in your test 3"
              value={this.state.test3}
              onChange={(e)=>{this.setState({test3:e.target.value})}}
              />
            <h6>write test 3 description here</h6>
            <input
              className="code-example"
              type="text"
              placeholder="test description"
              value={this.state.description3}
              onChange={(e)=>{this.setState({description3:e.target.value})}}
              />
          </code>
          <code>
          <h6> test 4 code</h6>
            <input
              className="code-test"
              type="text"
              placeholder="type in your test 4"
              value={this.state.test4}
              onChange={(e)=>{this.setState({test4:e.target.value})}}
              />
            <h6>write test 4 description here</h6>
            <input
              className="code-example"
              type="text"
              placeholder="test description"
              value={this.state.description4}
              onChange={(e)=>{this.setState({description4:e.target.value})}}
              />
          </code>
          <code>
          <h6> test 5 code</h6>
            <input
              className="code-test"
              type="text"
              placeholder="type in your test 5"
              value={this.state.test5}
              onChange={(e)=>{this.setState({test5:e.target.value})}}
              />
            <h6>write test 5 description here</h6>
            <input
              className="code-example"
              type="text"
              placeholder="test description"
              value={this.state.description5}
              onChange={(e)=>{this.setState({description5:e.target.value})}}
              />
          </code>
        </section>
        <section>
        <code>
          <input
            className="code-example"
            type="text"
            placeholder="type in your example solutions for all your test here"
            value={this.state.code}
            onChange={(e)=>{this.setState({code:e.target.value})}}
            />
        </code>
        </section>
      </div>
    )
  }

}

export default CreateChallenge
