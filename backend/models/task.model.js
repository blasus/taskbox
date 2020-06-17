'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title for a task is required'],
            maxLength: 250
        },
        description: {
            type: String,
            maxlength: 1000
        },
        attachment: {
            type: Schema.Types.ObjectId,
            ref: 'Attachment'
        },
        pinned: {
            type: Boolean,
            default: false
        },
        completed: {
            type: Boolean,
            default: false
        },
        discontinued: {
            type: Boolean,
            default: false
        },
        due_date: {
            type: Date
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Task', Task);