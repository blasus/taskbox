// TaskList component definition
import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import { connect } from 'react-redux';
import { completeTask, pinTask, deleteTask } from '../actions/TaskActions';

export function PureTaskList({ loading, tasks, onPinTask, onCompleteTask, onDeleteTask }) {
    const events = {
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

    if(tasks.length === 0) {
        return (
            <div className="list-items">
                <div className="wrapper-message">
                    <span className="icon-check" />
                    <div className="title-message">You have no tasks</div>
                    <div className="subtitle-message">Sit back and relax</div>
                </div>
            </div>
        );
    }

    const tasksInOrder = [
        ...tasks.filter(t => t.pinned),
        ...tasks.filter(t => !(t.pinned || t.completed)),
        ...tasks.filter(t => t.completed)
    ];

    return (
        <div className="list-items">
            {tasksInOrder.map(task => (
                <Task key={task.id} task={task} {...events} />
            ))}
        </div>
    );
}

PureTaskList.propTypes = {
    loading: PropTypes.bool,
    tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired, 
    onPinTask: PropTypes.func.isRequired, 
    onCompleteTask: PropTypes.func.isRequired,
    onDeleteTask: PropTypes.func.isRequired
};

PureTaskList.defaultProps = {
    loading: false
};

export default connect(
    ({ tasks }) => ({
        // take only the active and completed task, the others will be shown on recycle bin
        tasks: tasks.filter(t => !t.discontinued),
    }),
    dispatch => ({
        onCompleteTask: id => dispatch(completeTask(id)),
        onPinTask: id => dispatch(pinTask(id)),
        onDeleteTask: id => dispatch(deleteTask(id))
    })
)(PureTaskList);