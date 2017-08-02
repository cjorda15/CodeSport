import React from 'react'
import { mount, shallow } from 'enzyme'
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock'
import { browserHistory } from 'react-router-dom'
import NewTest from './NewTest'
// import CreateChallengeContainer from './CreateChallengeContainer';
import CreateChallenge from './CreateChallenge'