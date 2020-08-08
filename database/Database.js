var sqlite3 = require("sqlite3").verbose();
var uuid = require("uuid");

const appData = new sqlite3.Database("appData.db");

function init() {
    // appData.exec("DROP TABLE todo_data;", (error, result) => {
    //   if (error) console.log(error);
    //   else console.log(result);
    // });

  // appData.exec("CREATE TABLE todo_data ( id UNIQUEIDENTIFIER PRIMARY KEY NOT NULL , name CHAR(256) NOT NULL, created_date DATETIME DEFAULT (datetime('now')), status CHAR(256) DEFAULT('NOT STARTED'));", (error, results) => {
  //   if (error) {
  //     console.log('Table already exists!');
  //   } else {
  //     console.log("DataBase Created!");
  //   }
  // });

  appData.exec(
    "CREATE TABLE IF NOT EXISTS todo_data ( id UNIQUEIDENTIFIER PRIMARY KEY NOT NULL , name CHAR(256) NOT NULL, created_date DATETIME DEFAULT (datetime('now')), status CHAR(256) DEFAULT('NOT STARTED'));"
  );
}

init();

exports.list_all_tasks = function (callback) {
  appData.all("SELECT * from todo_data;", (error, results) => {
    if (error) {
      console.log(error);
    }
    callback(results);
  });
};

exports.create_a_task = function (name, callback) {
  appData.run(
    "INSERT INTO todo_data ('name', 'id') VALUES (?,?)",
    [name, uuid.v4()],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      callback();
    }
  );
};

exports.get_a_task = function (taskID, callback) {
  appData.get(
    "SELECT * from todo_data WHERE id='" + taskID + "';",
    [],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      callback(results);
    }
  );
};

exports.update_a_task = function (req, callback) {
  appData.run(
    "UPDATE todo_data SET " +
      updateQueryBuilder(req) +
      " WHERE id='" +
      req.params.taskId +
      "';",
    [],
    (error) => {
      if (error) {
        console.log(error);
      }
      callback();
    }
  );
};

exports.delete_a_task = function (taskID, callback) {
  appData.run(
    "DELETE FROM todo_data WHERE id='" + taskID + "';",
    [],
    (error) => {
      if (error) console.log(error);
      else callback();
    }
  );
};

function updateQueryBuilder(req) {
  var query = "";

  Object.keys(req.body).forEach((element, index) => {
    query += `'${element}'` + " = " + `'${req.body[element]}'`;
    if (index < Object.keys(req.body).length - 1) {
      query += ", ";
    }
  });

  return query;
}
