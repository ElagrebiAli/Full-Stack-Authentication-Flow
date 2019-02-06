// These are the normal action creators you have seen so far.
// The actions they return can be dispatched without any middleware.
export const signPayload=(type,token)=>({type,payload:token})
export const signError=(type,errorMesg)=>({type,payload:errorMesg})
export const signOutAction=(type)=>({type})
export const secretDataPayload=(type,secretData)=>({type,payload:secretData})