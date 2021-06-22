import {combineReducers} from "redux"
import login from './login'
import password from './password'
import email from './email'
import initialmoney from './initialmoney'
const rootReducer = combineReducers({
    login,
    password,
    email,
    initialmoney
})

export default rootReducer