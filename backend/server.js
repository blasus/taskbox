const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
// eslint-disable-next-line no-unused-vars
const mongoose = require('./db/mongoose');

const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024, //2MB max file(s) size
        files: 2
    }
}));

// other middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

const taskController = require('./controllers/task.controller');
taskController(app);

// start app
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Server is running on Port: " + PORT));


