'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** @todo this model is WIP, will be used later for projects definition */
const Project = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        tasks: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Task"
                }
            ]
        }
    }
);

module.exports = mongoose.model('Project', Project);