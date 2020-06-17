import { createStore } from 'redux';
import rootReducer from '../reducers';

// The initial state of our store when the app loads.
// Usually you would fetch this from a server
const defaultTasks = [
    { id: '1', title: 'Something', pinned: false, completed: false, discontinued: false, due: new Date(2022, 3, 12) },
    { id: '2', title: 'Something more', pinned: false, completed: false, discontinued: false, due: new Date(2022, 3, 12) },
    { id: '3', title: 'Something else', pinned: false, completed: false, discontinued: false, due: new Date(2022, 3, 12) },
    { id: '4', title: 'Something again', pinned: false, completed: false, discontinued: false, due: new Date(2022, 3, 12) },
];

// We export the constructed redux store
export default createStore(rootReducer, { tasks: defaultTasks });