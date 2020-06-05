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
            'title description pinned completed created_at due_date',
            (err, docs) => {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).json(docs);
                }
            }
        )
    });

    /**
     * GET/:id
     * retrieve and display the task with argument id
     */
    app.get('/tasks/:id', (req, res) => {
        Task.findById(req.params.id, (err, task) => {
            if (err) {
                console.log(err);
                res.status(400).send({ message: 'task not found' });
            } else {
                res.status(200).json(task);
            }
        });
    });

    /**
     * POST/
     * Add a new task to the db
     */
    app.post('/tasks/add', (req, res) => {
        try {
            const {
                title,
                description,
                due,
                files
            } = req.body;

            const newTask = new Task({
                title: title,
                description: description,
                due_date: due
            });
            newTask
                .save()
                .then(async (task) => {
                    // upload the new files

                    if (files) {
                        files.forEach(file => {
                            file.mv('./uploads/' + file.name);

                            // save also a reference to the file in the db
                            const newAttachment = new Attachment({
                                name: file.name,
                                mimeType: file.mimeType,
                                size: file.size,
                                path: './uploads/' + file.name
                            });
                            task.attachments.push(newAttachment);
                            task.save();
                        });
                    }

                    res.status(201).send(task);
                });

        } catch (err) {
            res.status(500).send(err);
        }
    });
}

