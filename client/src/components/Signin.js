import React,{Component} from 'react'
import {GoogleLogin} from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import {connect} from 'react-redux'

import FormikForm from './FormikForm'
import * as actions from '../redux-reducers-actions/actions/actionCreators/asyncAction' 

class Signin extends Component{
    onSubmit=async(data)=>{
        await this.props.signIn(data)
        if(!this.props.errorMessage){
            this.props.history.push('/dashboard')
        }
        
    }
   response= async(res)=>{
        await this.props.oauth(res.accessToken)
        if(!this.props.errorMessage){
            this.props.history.push('/dashboard')
        }
        
    }
    render(){
        const isSignup=false
        console.log(process.env.REACT_APP_FACEBOOK_Client_ID)
        return (
         <div className="row">
            <div className="col">
            <FormikForm {...this.props} isSignup={isSignup} onSubmit={this.onSubmit}/>
            </div>
            <div className="col">
               <div className="text-center" style={{width:"50%",marginLeft:"25%"}}>
                  <div className="alert alert-custom  fade in alert-dismissable show">
                    Or Sign up using service Provider
                  </div>
                  <div style={{width:"20%",marginLeft:"20%"}}>
                  <FacebookLogin
                     appId={process.env.REACT_APP_FACEBOOK_Client_ID}
                     textButton="facebook"
                     fields="name,email,picture" 
                     callback={this.response} 
                     cssClass="btn btn-outline-primary"
                     icon="fab fa-facebook-f pr-1" />
                     
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_Client_ID}
                    onSuccess={this.response}
                    onFailure={this.response} 
                    render={renderProps => (
                        <button onClick={renderProps.onClick} className="btn btn-outline-danger"><i className="fa fa-google-plus pr-1"></i>&nbsp;Google</button>
                      )}   
                   />
                  </div>
               </div>
            </div>
         </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      errorMessage: state.auth.errorMessage
    }
  }

export default connect(mapStateToProps,actions)(Signin)