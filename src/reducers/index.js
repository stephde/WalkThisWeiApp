import { combineReducers } from 'redux';
import position from './position';
import filter from './filter';
import stories from './stories';
import activeUser from './users';


export default combineReducers({
  stories,
  activeUser,
  position,
  filter
});
