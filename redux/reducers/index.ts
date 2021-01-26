import {combineReducers} from 'redux';

import settings from './settings';
import user from './user';

const rootReducers = combineReducers({settings, user});

export default rootReducers;
