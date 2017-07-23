import {combineReducers} from "redux"
import user from './user'
import battle from './battle'
const rootReducer = combineReducers({
  battle,
  user
})

export default rootReducer
