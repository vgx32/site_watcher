import { combineReducers } from 'redux';
import friendList from './friendList';
import counters from './counters';

const rootReducer = combineReducers({
  friendList,
  counters
});

export default rootReducer;
