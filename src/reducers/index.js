import { combineReducers } from 'redux';
import position from './position';
import filter from './filter';
import stories from './stories';
import activeUser from './activeUser';
import progress from './progress';


export default combineReducers({
  stories,
  activeUser,
  progress,
  position,
  filter
});
