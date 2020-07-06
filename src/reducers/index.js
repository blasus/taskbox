import { combineReducers } from 'redux';
import tasks from './task';

/**
 * combineReducers is important to understand. As your app might grow in size
 * and complexity, you will likely begin to split your reducers into separate
 * functions - with each one managing a separate slice of the state! This helper
 * function from 'redux' simply merges the reducers.
 * 
 * More info: http://rackt.org/redux/docs/api/combineReducers.html
 */
const rootReducer = combineReducers({
    tasks,
    // other reducers
});

export default rootReducer;