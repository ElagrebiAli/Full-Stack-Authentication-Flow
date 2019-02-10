// Meet thunks.
// A thunk is a function that returns a function.
// Return a function that accepts `dispatch` so we can dispatch later.
// reduxThunk middleware knows how to turn thunk async actions into actions.
import axios from 'axios'

import { AUTH_SIGN,AUTH_SIGN_OUT ,DASHBOARD_GET_DATA, AUTH_ERROR_IN, AUTH_ERROR_UP } from '../types'
import { signPayload ,signError ,signOutAction ,secretDataPayload} from './normalAction'

//auth reducer async action 
export const oauth=data=>{
    return async dispatch=>{
       
        const {data:{token}}=await axios.post('/api/v1/user/oauth/google',
        {
             access_token: data
        })
        dispatch(signPayload(AUTH_SIGN,token))
        localStorage.setItem('JWT_TOKEN',token)
        axios.defaults.headers.common['Authorization'] = token
    }
}

export const signIn=data=>{
    return async dispatch=>{
        try{
            const {data:{token}}=await axios.post('/api/v1/user/signin',data)
            dispatch(signPayload(AUTH_SIGN,token))
            localStorage.setItem('JWT_TOKEN',token)
            axios.defaults.headers.common['Authorization'] = token
        }catch(err){
            dispatch(signError(AUTH_ERROR_IN,"Email and password combination isn't valid"))
        }
        
        
    }
}
export const signUp=data=>{
    return async dispatch=>{
        try{
          const {data:{user:{token}}}=await axios.post('/api/v1/user/signup',data)

          dispatch(signPayload(AUTH_SIGN,token))
          localStorage.setItem('JWT_TOKEN',token)
          axios.defaults.headers.common['Authorization'] = token
          
        }catch(err){
          dispatch(signError(AUTH_ERROR_UP,'Email is already in use'))
        }
    }
}

export const signOut=()=>{
    return dispatch=>{
        localStorage.removeItem('JWT_TOKEN')
        axios.defaults.headers.common['Authorization'] = ''
        dispatch(signOutAction(AUTH_SIGN_OUT))
    }
}

//secretData reducer async action 

export const getSecret=()=>{
    return async dispatch=>{
        try{
            const {data:{email}}=await axios.get('/api/v1/user/secret')
            dispatch(secretDataPayload(DASHBOARD_GET_DATA,{email}))
        }catch(err){
          console.log('secret data error here',err)
        }
    }
}
