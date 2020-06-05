'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title for a task is required']
        },
        description: {
            type: String
        },
        attachments: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Attachment'
                }
            ]
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