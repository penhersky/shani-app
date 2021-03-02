import {combineReducers} from 'redux';

import settings from './settings';
import categories from './categories';
import user from './user';
import notification from './notification';

const rootReducers = combineReducers({
  settings,
  categories,
  user,
  notification,
});

export default rootReducers;
