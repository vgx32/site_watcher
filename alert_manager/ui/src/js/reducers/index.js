import { combineReducers } from 'redux';
import auth from './auth';
import resultList from './resultList';
import alertList from './alertList';

const rootReducer = combineReducers({
  resultList,
  alertList,
  auth
});

export default rootReducer;
