import * as types from '../constants/ActionTypes';

export function createUser(email, password) {
  return {
    type: types.CREATE_USER,
    email,
    password
  };
}

export function login(email, password) {
  return {
    type: types.LOGIN,
    email,
    password
  };
}

export function logout() {
  return {
    type: types.LOGOUT,
  };
}

export function clearAuthError(){
  return {
    type : types.CLEAR_AUTH_ERROR,
  };
}

