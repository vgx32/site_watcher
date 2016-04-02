import { combineReducers } from 'redux';
import friendList from './friendList';
import counters from './counters';
import auth from './auth';


const rootReducer = combineReducers({
  friendList,
  auth
});

export default rootReducer;
