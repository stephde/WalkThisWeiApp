import { combineReducers } from 'redux';
import annotation from './annotation';
import position from './position';

export default combineReducers({
  annotation,
  position
});
