import ActionTypes from '../constants/ActionTypes';

const taskAddedReducer = () => {
    return (state, action) => {
        let newTask = action.id;
        return state.concat(newTask);
    };
}

const taskEditedReducer = () => {
    return (state, action) => {
        let editedTask = action.id;
        return state.map(
            task => {
                return (task.id === editedTask.id) ? { ...task, editedTask } : task;
            }
        );
    }
}

const taskCompletedReducer = () => {
    return (state, action) => state.map(
        task => {
            return (task.id === action.id) ? { ...task, completed: !task.completed } : task;
        }
    );
};

const taskPinnedReducer = () => {
    return (state, action) => state.map(
        task => {
            return (task.id === action.id) ? { ...task, pinned: !task.pinned } : task;
        }
    );
};

const taskDeletedReducer = () => {
    return (state, action) => state.map(
        task => {
            return (task.id === action.id) ? { ...task, discontinued: !task.discontinued } : task;
        }
    );
};

// The reducer describes how the contents of the store change for each action
export default (state = [], action) => {
    switch(action.type) {
        case ActionTypes.ADD_TASK:
            return taskAddedReducer()(state, action);
        case ActionTypes.EDIT_TASK:
            return taskEditedReducer()(state, action);
        case ActionTypes.COMPLETE_TASK:
            return taskCompletedReducer()(state, action);
        case ActionTypes.PIN_TASK:
            return taskPinnedReducer()(state, action);
        case ActionTypes.DELETE_TASK:
            return taskDeletedReducer()(state, action);
        default:
            return state;
    }
};