import { combineReducers } from 'redux';
import annotation from './annotation';
import position from './position';
import filter from './filter';


export default combineReducers({
  annotation,
  position,
  filter
});
