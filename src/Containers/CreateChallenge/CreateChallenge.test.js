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
  
})