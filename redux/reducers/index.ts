import {combineReducers} from 'redux';

import settings from './settings';
import categories from './categories';
import user from './user';
import notification from './notification';
import task from './Task';
import comments from './comments';

const rootReducers = combineReducers({
  settings,
  categories,
  user,
  notification,
  task,
  comments,
});

export default rootReducers;
