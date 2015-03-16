var express = require('express');
var app = express();
var ejs = require('ejs');
var fs = require('fs');
var path = require('path');
var data = require('./data.js');


app.use(express.static(path.join(__dirname, 'public')));
// app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res){
  // res.send(students)
data.makeStudentObject(function (v) {
  var students = v;
  console.log(students)
  res.render('index', {students: students})
   });
// console.log(students)
})

var server = app.listen(process.env.PORT || 3000, function(){

  var host = server.address().address
  var port = server.address().port

  console.log("hello", host, port)
})
