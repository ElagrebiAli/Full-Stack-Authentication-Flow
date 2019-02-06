

import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reduxThunk from 'redux-thunk'
import axios from 'axios'

import App from './components/App';
import combineReducers from './redux-reducers-actions/reducers'
import Container from './components/Container'
import * as serviceWorker from './serviceWorker';

const token=localStorage.getItem('JWT_TOKEN')
axios.defaults.headers.common['Authorization'] = token

 // applyMiddleware supercharges createStore with middleware
ReactDOM.render(
<Provider store={createStore(combineReducers,{
  auth:{
    token:token ? token : '',
    isAuthenticated:token ? true : false,
  }
},applyMiddleware(reduxThunk))}>
  <BrowserRouter>
   <App>
     <Container />
   </App>
  </BrowserRouter>
</Provider>, document.getElementById('root'));

serviceWorker.unregister();
