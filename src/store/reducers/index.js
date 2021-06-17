import {combineReducers} from "redux"
import login from './login'
import password from './password'
const rootReducer = combineReducers({
    login,
    password,
})

export default rootReducer