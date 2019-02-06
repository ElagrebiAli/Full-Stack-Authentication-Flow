//The combineReducers turns multi-reducers 
//into a single reducing function you can pass to createStore.
//The state produced by combineReducers() namespaces the states of each reducer under their keys as passed to combineReducers()
import {combineReducers} from 'redux'

import authReducer from './auth'
import secretReducer from './secretData'

export default combineReducers({
     auth:authReducer,
     secret:secretReducer
})