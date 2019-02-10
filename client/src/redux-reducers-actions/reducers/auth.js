import { AUTH_SIGN ,AUTH_ERROR_IN ,AUTH_SIGN_OUT,AUTH_ERROR_UP } from '../actions/types'

const DEFAULT_STATE={
    isAuthenticated:false,
    token:'',
    eerrorMessageSignIn:'',
    errorMessageSignUp:''
}

export default (state=DEFAULT_STATE,action)=>{
    switch (action.type){
        case AUTH_SIGN:  
        //override properties with ES9 (object Literals)
           return  {...state,token:action.payload,isAuthenticated:true,errorMessage:''}
        case AUTH_ERROR_IN:
           return {...state,errorMessageSignIn:action.payload}
        case AUTH_ERROR_UP:
           return {...state,errorMessageSignUp:action.payload}
        case AUTH_SIGN_OUT:
           return {...state,isAuthenticated:false,token:'',email:'',errorMessage:''}
        default:
            return state
    }
 
}
