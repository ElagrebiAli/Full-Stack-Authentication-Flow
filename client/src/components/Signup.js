import React,{Component} from 'react'
import {connect} from 'react-redux'


import FormikForm from './FormikForm'
import * as actions from '../redux-reducers-actions/actions/actionCreators/asyncAction'

class Signup extends Component{
   
    onSubmit=async (data)=>{
      await this.props.signUp(data)
       if(!this.props.errorMessage){
           this.props.history.push('/dashboard')
       }     
   }
    render(){
        const isSignup=true
        return (
         <FormikForm {...this.props} isSignup={isSignup} onSubmit={this.onSubmit}/>   
        )
    }
}
function mapStateToProps(state){
  return {
      errorMessage:state.auth.errorMessageSignUp
  }
}
export default connect(mapStateToProps,actions)(Signup)
