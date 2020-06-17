// Task component definition
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function Task(
    { 
        task: { id, title, completed, pinned, discontinued, due }, 
        onCompleteTask, 
        onPinTask, 
        onDeleteTask
    }
) {

    const showDue = () => {
        const remaining = due - Date.now();
        if(remaining > 0) {
            const days = moment.duration(moment(due).diff(moment())).asDays();
            return <span className="remaining">{days}</span>
        } else {
            return <span className="expired">Overdue</span>
        }
    };

    const className = completed ? "completed" : (pinned ? "pinned" : ""); 

    return (
        <div className={`list-item ${className}`}>
            <label className="checkbox">
                <input 
                    type="checkbox"
                    defaultChecked={completed}
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
                {!completed && (
                    <a onClick={() => onPinTask(id)}>
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
    onCompleteTask: PropTypes.func,
    onPinTask: PropTypes.func,
    onDeleteTask: PropTypes.func
}