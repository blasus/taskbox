// TaskList component definition
import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import AddTask from './AddTask';
import { connect } from 'react-redux';
import { addTask, editTask, completeTask, pinTask, deleteTask } from '../actions/TaskActions';

export function PureTaskList(
    { 
        loading, 
        tasks, 
        onAddTask,
        onEditTask,
        onPinTask, 
        onCompleteTask, 
        onDeleteTask 
    }
) {
    const events = {
        onAddTask,
        onEditTask,
        onPinTask,
        onCompleteTask,
        onDeleteTask
    };

    const LoadingRow = (
        <div className="loading-item">
            <span className="glow-checkbox" />
            <span className="glow-text">
                <span>Loading</span> <span>cool</span> <span>state</span>
            </span>
        </div>
    );

    if(loading) {
        return (
            <div className="list-items">
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
            </div>
        );
    }

    let listView;

    if(tasks.length === 0) {
        listView = (
            <div className="list-items">
                <div className="wrapper-message">
                    <span className="icon-check" />
                    <div className="title-message">You have no tasks</div>
                    <div className="subtitle-message">Sit back and relax</div>
                </div>
            </div>
        );
    } else {
        const tasksInOrder = [
            ...tasks.filter(t => t.pinned),
            ...tasks.filter(t => !(t.pinned || t.completed)),
            ...tasks.filter(t => t.completed)
        ];

        listView = (
            <div className="list-items">
                {tasksInOrder.map(task => (
                    <Task key={task.id} task={task} {...events} />
                ))}
            </div>
        );
    }

    return (
        <div>
            <AddTask />
            {listView}
        </div>
    );
}

PureTaskList.propTypes = {
    loading: PropTypes.bool,
    tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired, 
    onAddTask: PropTypes.func.isRequired,
    onEditTask: PropTypes.func.isRequired,
    onPinTask: PropTypes.func.isRequired, 
    onCompleteTask: PropTypes.func.isRequired,
    onDeleteTask: PropTypes.func.isRequired
};

PureTaskList.defaultProps = {
    loading: false
};

export default connect(
    // map state to props
    ({ tasks }) => ({
        // take only the active and completed task, the others will be shown on recycle bin
        tasks: tasks.filter(t => !t.discontinued),
    }),
    // map dispatch to props
    dispatch => ({
        onAddTask: id => dispatch(addTask(id)),
        onEditTask: id => dispatch(editTask(id)),
        onCompleteTask: id => dispatch(completeTask(id)),
        onPinTask: id => dispatch(pinTask(id)),
        onDeleteTask: id => dispatch(deleteTask(id))
    })
)(PureTaskList);