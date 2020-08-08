"use strict";

exports.list_all_tasks = function (req, res, database) {
  database.list_all_tasks((results) => {
    res.json(results);
  });
};

exports.create_a_task = function (req, res, database) {
  database.create_a_task(req.body.name, () => {
    res.json('Successfully added!');
  });
};

exports.get_a_task = function (req, res, database) {
  database.get_a_task(req.params.taskId, (result) => {
    res.json(result);
  });
};
  
exports.update_a_task = function (req, res, database) {
  database.update_a_task(req, () => {
    res.json('Successfully updated task!');
  })
};

exports.delete_a_task = function (req, res, database) {
  database.delete_a_task(req.params.taskId, () => {
    res.json('Successfully deleted task!');
  });
};
