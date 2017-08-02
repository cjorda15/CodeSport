import battle from './battle'
import battleRequest from './battleRequest'
import getChallenge from './getChallenge'
import user from './user'

describe('battle reducer',() => {
  it('should return state by default', () => {
    expect(battle(undefined,{})).toEqual("")
  })

  it('should add a opponent', () => {
    const action ={type:"OPPONENT_NAME",payload:"CJ"}
    expect(battle("",action)).toEqual('CJ')
  })

  it('should clear a opponent', () => {
    const action = {type:'CLEAR_OPPONENT'}
    expect(battle("CJ",action)).toEqual('')
  })

  it('should return default state with a unknown action', () => {
    const action = {type:'GET_Eeeh',payload:"wow"}
    expect(getChallenge(["meow"],action)).toEqual(["meow"])
  })
})

describe('battleRequest reducer', () => {

  it('should accept a request', () => {
    const action = {type:'ACCEPT_REQUEST'}
    expect(battleRequest(false,action)).toEqual(true)
  })

  it('should clear a request', () => {
    const action = {type:'CLEAR_OPPONENT'}
    expect(battleRequest(true,action)).toEqual(false)
  })

  it('should return default state with a unknown action', () => {
    const action = {type:'GET_Eeeh',payload:"wow"}
    expect(getChallenge(["meow"],action)).toEqual(["meow"])
  })

})

describe('getChallenge reducer', () => {
  it('should get a object for questions to be used for challenges', () => {
    const questions = {id:1234143,descriptions:["gee","qi","wiz","work"],questions:["var a=1"]}
    const action = {type:'GET_CHALLENGE',payload:questions}
    expect(getChallenge([],action)).toEqual(questions)
  })

  it('should return default state with a unknown action', () => {
    const action = {type:'GET_Eeeh',payload:"wow"}
    expect(getChallenge(["meow"],action)).toEqual(["meow"])
  })

})

describe('user reducer', () => {
  it('should return default state with a unknown action', () => {
    const action = {type:'GET_Eeeh',payload:"wow"}
    expect(user("dude",action)).toEqual("dude")
  })

  it('should login a user', () => {
    const action = {type:'LOGIN',payload:"cj"}
    expect(user('dude',action)).toEqual("cj")
  })

  it('should log off a user', () => {
    const action = {type:'LOGOUT'}
    expect(user('dude',action)).toEqual("")
  })

})
