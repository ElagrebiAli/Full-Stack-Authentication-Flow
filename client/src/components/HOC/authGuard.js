import React,{Component} from 'react'
import {connect} from 'react-redux'

import * as actions from '../../redux-reducers-actions/actions/actionCreators/asyncAction' 

export default (OrgComponent)=>{
    class ConnectComponent extends Component{
        checkAuth() {
            if (!this.props.isAuth) {
              this.props.history.push('/');
            }
          }
      
          componentDidMount() {
            this.checkAuth();
          }
      
        render(){
            return(
              <OrgComponent {...this.props}/>
              )
        }
    }
    function mapStateToProps(state){
         //we must choose the reducer that we will take from it the state data
        return{
            isAuth:state.auth.isAuthenticated,
            email:state.secret.email
        }
    }
    return connect(mapStateToProps,actions)(ConnectComponent)
}