import { AUTH_SIGN ,AUTH_ERROR ,AUTH_SIGN_OUT } from '../actions/types'

const DEFAULT_STATE={
    isAuthenticated:false,
    token:'',
    errorMessage:''
}

export default (state=DEFAULT_STATE,action)=>{
    switch (action.type){
        case AUTH_SIGN:  
        //override properties with ES9 (object Literals)
           return  {...state,token:action.payload,isAuthenticated:true,errorMessage:''}
        case AUTH_ERROR:
           return {...state,errorMessage:action.payload}
        case AUTH_SIGN_OUT:
           return {...state,isAuthenticated:false,token:'',email:'',errorMessage:''}
        default:
            return state
    }
 
}