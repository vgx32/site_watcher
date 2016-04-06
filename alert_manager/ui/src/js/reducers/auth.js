
import * as types from '../constants/ActionTypes';
import { assign } from 'lodash';

const initialState = {
  email : "test@email.com",
  token : "blah blah",
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
      return assign({}, state, {errorMessage : ""});;

    case types.CLEAR_AUTH_ERROR:
      return assign({}, state, {errorMessage: ""});

    case types.LOGIN:
      
      if (action.email === "a@b.c" && action.password === "123") {
        return assign({}, state, {
          errorMessage: "Login correct!",
          token: "a test token"
        });
      } else {
        return assign({}, state, {errorMessage: "Incorrect email or password."});        
      }
      
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