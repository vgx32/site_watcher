import * as types from '../constants/ActionTypes';


export function createAlert(newAlert){
  return {
    type: types.CREATE_ALERT,
    newAlert: newAlert
  }
} 
export function toggleCreatingAlert(){
  return {
    type: types.TOGGLE_CREATING_ALERT,
  }
} 

export function editAlert(id, newValues){
  return {
    type: types.EDIT_ALERT,
    newValues: newValues,
    id: id
  }
} 

export function toggleEditAlert(id){
  return {
    type: types.TOGGLE_EDIT_ALERT,
    id: id
  }
} 

export function deleteAlert(id){
  return {
    type: types.DELETE_ALERT,
    id: id
  }
} 
