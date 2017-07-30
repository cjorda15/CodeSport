import {combineReducers} from "redux"
import user from './user'
import battle from './battle'
import battleRequest from './battleRequest'

const rootReducer = combineReducers({
  battle,
  user,
  battleRequest
})

export default rootReducer
