/**
 * Another clever approach of writing reducers:
 *
 * export default function(state = initialState, action) {
 *   const actions = {
 *      [ACTION_TYPE]: () => [action.payload.data, ...state]
 *   };
 *
 *   return (_.isFunction(actions[action.type])) ? actions[action.type]() : state
 * }
 */

import * as types from '../constants/ActionTypes';
import { assign } from 'lodash';

const initialState = {
  count : 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.INCREMENT_COUNT:
      console.log("incrementing a counter");
      return {
        ...state, 
        count : state.count + 1
      };
      // const len = state.friends.length ? state.friends.length : 1;
      // const newId = (state.friends[len - 1] + 1) || 0;
      // return {
      //   ...state,
      //   friends: state.friends.concat(newId),
      //   friendsById: [
      //     ...state.friendsById,
      //     {
      //       id: newId,
      //       name: action.name
      //     }
      //   ]
      // };

    
    default:
      return state;
  }
}
