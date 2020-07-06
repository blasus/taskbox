import ActionTypes from "../constants/ActionTypes";

// The action creators bundle actions with the data required to execute them
export const addTask = id => ({ type: ActionTypes.ADD_TASK, id });
export const editTask = id => ({ type: ActionTypes.EDIT_TASK, id });
export const completeTask = id => ({ type: ActionTypes.COMPLETE_TASK, id });
export const pinTask = id => ({ type: ActionTypes.PIN_TASK, id });
export const deleteTask = id => ({ type: ActionTypes.DELETE_TASK, id });