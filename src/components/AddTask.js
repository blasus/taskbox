import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AddTask = ({ onAddTask }) => {
    let input;

    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    if (!input.value.trim()) {
                        return;
                    }
                    onAddTask(input.value);
                    input.value = '';
                }}
            >
                <input
                    ref={node => {
                        input = node;
                    }}
                />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    );
};

AddTask.propTypes = {
    onAddTask: PropTypes.func.isRequired
}

export default connect({})(AddTask);