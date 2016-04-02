
import * as types from '../constants/ActionTypes';
import { assign } from 'lodash';

const initialState = {
  email : undefined,
  token : undefined,
  errorMessage : ""
}

function verifyEmailMessage(email){
  return email.match(/.*@.*\..*/) === null? 
    "Please enter a valid email address" : "";
}

function verifyPasswordComplexity(password) {
  return password.length < 8?
     "Password must be at least 8 characters long." : "";
}

export default function (state = initialState, action) {
// TODO: add code to asynchronously get creds from the server
  switch (action.type) {
    case types.CREATE_USER:
      var emailError = verifyEmailMessage(action.email);
      if (emailError !== "") {
        return assign({}, state, {errorMessage : emailError});
      }
      var passwordError = verifyPasswordComplexity(action.password);
      if (passwordError !== "") {
        return assign({}, state, {errorMessage : passwordError});
      }
      console.log("creating user " + action.email + ":" + action.password);
      return assign({}, state, {errorMessage : ""});;
    case types.LOGIN:
      console.log("logging in user " + action );
      return state;
    case types.LOGOUT:
      console.log("logging out");
      return {
        email : undefined,
        token : undefined,
        errorMessage: undefined
      };
    default:
      return state;
  }

}