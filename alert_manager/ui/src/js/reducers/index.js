import { combineReducers } from 'redux';
import auth from './auth';
import resultList from './resultList'


const rootReducer = combineReducers({
  resultList,
  auth
});

export default rootReducer;
