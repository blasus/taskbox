'use strict';

const { Task, Attachment } = require('../models');

module.exports = app => {
    
    /**
     * GET/
     * retrieve and display all the Tasks not discontinued (deleted)
     */
    app.get('/tasks', (req, res) => {
        Task.find(
            { discontinued: false },
            'title description pinned completed discontinued created_at due_date',
            (err, docs) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("An error occurred");
                } else {
                    res.status(200).json(docs);
                }
            }
        )
    });

    /**
     * GET/:id
     * retrieve and display the task with id as parameter
     */
    app.get('/tasks/:id', (req, res) => {
        Task.findById(req.params.id, (err, task) => {
            if (err) {
                console.log(err);
                res.status(400).send("An error occurred");
            } else if(!task) {
                res.status(404).send("Task is not found");
            } else {

                /** @todo get the reference to the attachment */
                res.status(200).json(task);
            }
        });
    });

    /**
     * function to add attachment to the saved task
     * @param {*} taskId 
     * @param {*} file 
     */
    const addAttachment = (taskId, file) => {
        try {
            // first upload the file into the server
            const path = './uploads/' + file.name + '_' + taskId;
            file.mv(path);
    
            // then save also a reference to the file in the db
            const newAttachment = new Attachment({
                name: file.name,
                mimeType: file.mimetype,
                size: file.size,
                path: path
            });
    
            return Attachment.create(newAttachment).then(docFile => {
                // finally update the reference to the task with the new attachment
                return Task.findByIdAndUpdate(
                    taskId,
                    {
                        $push: {
                            attachment: docFile
                        }
                    },
                    { new: true, useFindAndModify: false }
                );
            });
        } catch(err) {
            console.log("file with name: " + file.name + " has not been saved: " + err);
            return Promise.reject(err);
        }
    }

    /**
     * POST/
     * Add a new task to the db
     */
    app.post('/tasks/add', (req, res) => {
        try {
            const {
                title,
                description,
                due
            } = req.body;

            const newTask = new Task({
                title: title,
                description: description,
                due_date: due
            });
            newTask
                .save()
                .then(async (task) => {
                    
                    let doc = task;
                    // upload the new files
                    if (req.files) {
                        const attachment = req.files.attachment;
                        doc = await addAttachment(task.id, attachment);
                    }

                    res.status(201).send(doc);
                });

        } catch (err) {
            console.log(err)
            res.status(500).send("An error occurred");
        }
    });

    /**
     * POST/:id
     * update the task with id as parameter
     */
    app.post('/tasks/update/:id', (req, res) => {
        Task.findById(req.params.id, (err, task) => {
            if (!task) {
                res.status(404).send("Task is not found");
            } else {
                const {
                    title,
                    description,
                    pinned,
                    completed,
                    discontinued,
                    due
                } = req.body;

                task.title = title;
                task.description = description;
                task.pinned = pinned;
                task.completed = completed;
                task.discontinued = discontinued;
                task.due_date = due;

                /** @todo update attachment ref */

                task.save().then(() => {
                    res.json('Task updated!');
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).send("Update not possible");
                });
            }
        });
    });
}

