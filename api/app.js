var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let tasks = [
  { task: "Task 1", id: 1 },
  { task: "Task 2", id: 2 }
];


app.get('/tasks', function (req, res) {
  res.send({ tasks });
});


let taskIdAutoIncrement = 2;

app.get("/tasks/:id", (req, res) => {
  const chair = tasks.find(chair => chair.id === Number(req.params.id));
  return res.send({ data: chair });
});

app.post("/tasks", (req, res) => {
  console.log(req.body.task);
  const newTaskObject = {};
  newTaskObject.task = req.body.task;
  newTaskObject.id = ++taskIdAutoIncrement;
  tasks.push(newTaskObject);
  console.log(tasks);
  res.send({ tasks });
});

app.patch("/tasks/:id", (req, res) => {
  console.log("here");
  tasks = tasks.map(task => {
    if (task.id === Number(req.params.id)) {

      return { task: req.body.task, id: task.id };
    }
    return task;
  });
  res.send({ tasks });
});

app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(task => task.id !== Number(req.params.id));
  res.send({ tasks });
  console.log("blblblbl")
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
