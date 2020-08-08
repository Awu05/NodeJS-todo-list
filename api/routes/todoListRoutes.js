'use strict';
module.exports = function(app, database) {
    var todoList = require('../controllers/todoListController');

    //todoList Routes
    app.route('/tasks')
        .get((req, res) => todoList.list_all_tasks(req, res, database))
        .post((req, res) => todoList.create_a_task(req, res, database));

    app.route('/tasks/:taskId')
        .get((req, res) => todoList.get_a_task(req, res, database))
        .put((req, res) => todoList.update_a_task(req, res, database))
        .delete((req, res) => todoList.delete_a_task(req, res, database));
};