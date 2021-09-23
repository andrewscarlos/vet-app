import { combineReducers } from 'redux';

import animals from './animals';
import user from './user';
import pessoa from './pessoa';

export default combineReducers({
    animals,
    user,
    pessoa
})