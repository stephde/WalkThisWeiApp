import { combineReducers } from 'redux';
import position from './position';
import filter from './filter';
import stories from './stories';
import users from './users';


export default combineReducers({
  stories,
  users,
  position,
  filter
});
