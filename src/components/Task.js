// Task component definition
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

export default function Task(
    { 
        task: { id, title, completed, pinned, due },
        onEditTask,
        onCompleteTask, 
        onPinTask, 
        onDeleteTask
    }
) {

    let showDue;
    const remaining = due - Date.now();
    if(remaining > 0) {
        const days = moment.duration(moment(due).diff(moment())).asDays();
        showDue = <span className="remaining">{days}</span>;
    } else {
        showDue = <span className="expired">Overdue</span>;
    }

    const className = completed ? "completed" : (pinned ? "pinned" : ""); 

    /** @todo add a reference to a modal view containing the form to edit task */
    return (
        <div className={`list-item ${className}`}>
            <label className="checkbox">
                <input 
                    type="checkbox"
                    checked={completed}
                    disabled={true}
                    name="checked"
                />
                <span className="checkbox-custom" onClick={() => onCompleteTask(id)} />
            </label>
            
            <div className="title">
                <input 
                    type="text" 
                    value={title} 
                    readOnly={true} 
                    placeholder="Input title"
                    style={{ width: '95%', textOverflow: 'ellipsis' }} 
                />
                {showDue}
            </div>

            <div className="actions" onClick={event => event.stopPropagation()}>
                <a href="#" className="edit-btn" onClick={() => onEditTask(id)}>
                    <FontAwesomeIcon className={`icon-edit`} icon="edit" />
                </a>
                {!completed && (
                    <a href="#" className="pin-btn" onClick={() => onPinTask(id)}>
                        <span className={`icon-star`} />
                    </a>
                )}
            </div>
        </div>
    );
}

Task.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool,
        pinned: PropTypes.bool,
        discontinued: PropTypes.bool,
        due: PropTypes.instanceOf(Date)
    }),
    onEditTask: PropTypes.func.isRequired,
    onCompleteTask: PropTypes.func.isRequired,
    onPinTask: PropTypes.func.isRequired,
    onDeleteTask: PropTypes.func.isRequired
}