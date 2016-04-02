
import * as types from '../constants/ActionTypes';

const initialState = {
  email : undefined,
  token : undefined
}


export default function (state = initialState, action) {
// TODO: add code to asynchronously get creds from the server
  switch (action.type) {
    case types.CREATE_USER:
      console.log("creating user " + action.email + ":" + action.password);
      debugger;
      return state;
    case types.LOGIN:
      console.log("logging in user " + action );
      return state;
    case types.LOGOUT:
      console.log("logging out");
      return state;
    default:
      return state;
  }

}