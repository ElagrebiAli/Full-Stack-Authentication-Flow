import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import * as actions from '../redux-reducers-actions/actions/actionCreators/asyncAction' 

const Header=({isAuth,signOut})=>{
    return(
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#a265bb"}}>
               <Link className="navbar-brand" to="/">API Auth</Link>
               <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                           <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                     </ul>

                     <ul className="nav navbar-nav ml-auto">
                         {!isAuth?[<li className="nav-item" key="signup">
                            <Link className="nav-link" to="/signup">Sign Up</Link>
                         </li>,
                         <li className="nav-item" key="signin">
                            <Link className="nav-link" to="/signin" >Sign In</Link>
                          </li>]: 
                         <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={signOut} >Sign Out</Link>
                         </li> }
                      </ul>
               </div>
        </nav>
        
    )
}

function mapStateToProps(state){
   return{
      isAuth:state.auth.isAuthenticated
   }

}

export default connect(mapStateToProps,actions)(Header)