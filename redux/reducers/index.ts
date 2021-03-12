import {combineReducers} from 'redux';

import settings from './settings';
import categories from './categories';
import user from './user';
import notification from './notification';
import task from './Task';

const rootReducers = combineReducers({
  settings,
  categories,
  user,
  notification,
  task,
});

export default rootReducers;
