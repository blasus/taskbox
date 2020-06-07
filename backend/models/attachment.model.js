'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Attachment = new Schema({
    name: {
        type: String,
        required: true
    },
    mimeType: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    path: {
        type: String,
        required: true
    }
}
);

module.exports = mongoose.model('Attachment', Attachment);