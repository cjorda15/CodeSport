import {combineReducers} from "redux"
import user from './user'
import battle from './battle'
import battleRequest from './battleRequest'
import getChallenge from './getChallenge'


const rootReducer = combineReducers({
  battle,
  user,
  battleRequest,
  getChallenge
})

export default rootReducer
