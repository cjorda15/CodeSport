import React from 'react'
import { mount, shallow } from 'enzyme'
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock'
import { browserHistory } from 'react-router-dom'
import CreateChallengeContainer from './CreateChallengeContainer';
import CreateChallenge from './CreateChallenge'

describe('CreateChallengeContainer', () => {
  const mockStore = configureMockStore()({})
  it('should mount without crashing', () => {
    const wrapper = mount(<Provider store={mockStore}><CreateChallengeContainer history={'http://localhost:3000/'}/></Provider>)
  })

  it('should have empty or false values on load', () => {
    const wrapper = mount(<Provider store={mockStore}><CreateChallengeContainer history={'http://localhost:3000/'} /></Provider>)
    const test = wrapper.find(CreateChallenge)
    expect(test.node.state.challengeName).toEqual('')
    expect(test.node.state.code).toEqual('')
    expect(test.node.state.tests[0]).toEqual('')
    expect(test.node.state.tests[1]).toEqual('')
    expect(test.node.state.tests[2]).toEqual('')
    expect(test.node.state.tests[3]).toEqual('')
    expect(test.node.state.tests[4]).toEqual('')
    expect(test.node.state.tests[4]).toEqual('')
    expect(test.node.state.description1).toEqual('')
    expect(test.node.state.description2).toEqual('')
    expect(test.node.state.description3).toEqual('')
    expect(test.node.state.description4).toEqual('')
    expect(test.node.state.description5).toEqual('')
    expect(test.node.state.failedTests).toEqual([])
    expect(test.node.state.runButtonClicked).toEqual(false)
    expect(test.node.state.value).toEqual('beginner')
    expect(test.node.state.done).toEqual(false)
  })

  it('should reflect user input', () => {
    const wrapper = mount(<Provider store={mockStore}><CreateChallengeContainer history={'http://localhost:3000/'} /></Provider>)
    const test = wrapper.find(CreateChallenge)
    const challengeTitle = wrapper.find('#challenge-title')
    const firstTextArea = wrapper.find('.code-test').first()
    const firstDescription = wrapper.find('.code-description').first()
    const codeInput = wrapper.find('.code-example')

    challengeTitle.simulate('change', { target: { value: 'Wizard'}})
    firstTextArea.simulate('change', { target: { value: '(if wizard.name === "Gandalf")'}})
    firstDescription.simulate('change', { target: { value: 'Create Class Wizard with name Gandalf'}})
    codeInput.simulate('change', { target: { value: 'class Wizard {}'}})
    expect(test.node.state.challengeName).toEqual('Wizard')
    expect(test.node.state.tests[0]).toEqual('(if wizard.name === "Gandalf")')
    expect(test.node.state.description1).toEqual('Create Class Wizard with name Gandalf')
    expect(test.node.state.code).toEqual('class Wizard {}')
  })

  it('should store failed tests once run tests is clicked', () => {
    const wrapper = mount(<Provider store={mockStore}><CreateChallengeContainer history={'http://localhost:3000/'} /></Provider>)
    const test = wrapper.find(CreateChallenge)
    const codeInput = wrapper.find('.code-example')
    const runTestsBtn = wrapper.find('#run-tests')

    expect(test.node.state.failedTests).toEqual([])
    codeInput.simulate('change', { target: { value: 'class Wizard {constructor() {this.name = "Gandalf"}}' } })
    runTestsBtn.simulate('click')
    expect(test.node.state.failedTests.length).toEqual(5)
  })
})