import { DASHBOARD_GET_DATA } from '../actions/types';

const DEFAULT_STATE = {
  email: ''
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case DASHBOARD_GET_DATA:
      return { ...state, email: action.payload.email }
    default:
      return state
  }
}