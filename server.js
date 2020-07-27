var express = require("express"),
  app = express(),
  port = process.env.port || 3000,
  mongoose = require("mongoose"),
  Task = require("./api/models/todoListModel"), //created model Loading here
  bodyParser = require("body-parser");
require("dotenv").config();

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/Tododb');
// connect Mongoose to your DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/todolist-test12"
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require("./api/routes/todoListRoutes"); //import route
routes(app); //register the route

//Middleware must go at the end of routes(app)
//This uses express to intercept incoming http requests
app.use(function (req, res) {
  res.status(400).send({ url: req.originalUrl + " not found" });
});

app.listen(port);

console.log("todo list RESTful API server started on port: " + port);
