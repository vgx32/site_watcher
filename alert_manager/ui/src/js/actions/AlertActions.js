import * as types from '../constants/ActionTypes';


export function createAlert(newAlert){
  return {
    type: types.CREATE_ALERT,
    newAlert: newAlert
  }
} 
export function editAlert(id, newValues){
  return {
    type: types.EDIT_ALERT,
    newValues: newValues
  }
} 
export function deleteAlert(id){
  return {
    type: types.DELETE_ALERT,
    id: id
  }
} 
