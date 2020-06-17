import ActionTypes from '../constants/ActionTypes';

const taskAddedReducer = () => {
    return (state, action) => {
        /** @todo create new task with data from action and push to the server */
    };
}

const taskEditedReducer = () => {
    return (state, action) => {
        /** @todo edit task with data from action and push to the server */
    }
}

const taskCompletedReducer = () => {
    return (state, action) => {
        return {
            ...state,
            tasks: state.tasks.map(task => {
                return (task.id === action.id) ? { ...task, completed: !task.completed } : task;
            })
        };
    };
};

const taskPinnedReducer = () => {
    return (state, action) => {
        return {
            ...state,
            tasks: state.tasks.map(task => {
                return (task.id === action.id) ? { ...task, pinned: !task.pinned } : task;
            })
        }
    }
};

const taskDeletedReducer = () => {
    return (state, action) => {
        return {
            ...state,
            tasks: state.tasks.map(task => {
                return (task.id === action.id) ? { ...task, discontinued: !task.discontinued } : task;
            })
        }
    }
};

// The reducer describes how the contents of the store change for each action
export default task = (state, action) => {
    switch(action.type) {
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