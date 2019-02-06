import React from 'react'
import {Switch,Route,withRouter} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from "styled-components"

import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';
import Dashboard from './Dashboard';
import authGuard from './HOC/authGuard'

const AuthGuard=authGuard(Dashboard)

const Container=({location})=>{
    return(
    <Wrapper>
      <TransitionGroup className="transition-group">
        <CSSTransition
          key={location.key}
          timeout={{ enter: 300, exit: 300 }}
          classNames="fade"
        >
          <section className="route-section">
            <Switch location={location}>
               <Route exact path="/" render={(props)=><Home {...props}/>}/>
               <Route path="/signin" render={(props)=><Signin {...props} />}/>
               <Route path="/signup" render={(props)=><Signup {...props}/>}/>
               <Route path="/dashboard" component={AuthGuard}/>
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </Wrapper>
    )

}

const Wrapper=styled.div`
.fade-enter {
    opacity: 0.01;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }

  div.transition-group {
    position: relative;
  }

  section.route-section {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }`

export default withRouter(Container)