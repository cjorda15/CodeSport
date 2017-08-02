import {login, logout, opponentName, clearOpponent, acceptRequest, getChallenge} from './index.js'

describe('actions tests', () => {

  it('should login', () => {
    const username = 'chris'
    const expectedAction = {
      type: 'LOGIN',
      payload : 'chris'
    }
    expect(login(username)).toEqual(expectedAction)
  })

  it('should logout', () => {
    const expectedAction = {
      type: 'LOGOUT'
    }
    expect(logout()).toEqual(expectedAction)
  })

  it('should handle a opponent', () => {
    const opp = "cj"
    const expectedAction = {
      type: "OPPONENT_NAME",
      payload:opp
    }
    expect(opponentName(opp)).toEqual(expectedAction)
  })

  it('should clear a opponent ', () => {
    const expectedAction = {
      type: "OPPONENT_NAME",
    }
    expect(opponentName()).toEqual(expectedAction)
  })

  it('should accept a request', () => {
    const expectedAction = {
      type: "ACCEPT_REQUEST",
    }
    expect(acceptRequest()).toEqual(expectedAction)
  })

  it('should get a challenge', () => {

    const challenge = {
      id:1234,
      question:["die","live","repeat"],
      description:['whatever',"yay","fun"]
    }


    const expectedAction = {
      type: "GET_CHALLENGE",
      payload:challenge
    }
    expect(getChallenge(challenge)).toEqual(expectedAction)
  })

})
