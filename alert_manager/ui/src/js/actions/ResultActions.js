import * as types from '../constants/ActionTypes';

export function deleteResult(id) {
  return {
    type: types.DELETE_RESULT,
    id
  };
}