import {combineReducers} from 'redux';

import settings from './settings';
import categories from './categories';
import user from './user';

const rootReducers = combineReducers({settings, categories, user});

export default rootReducers;
