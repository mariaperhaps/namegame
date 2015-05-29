var express = require('express');
var app = express();
// var ejs = require('ejs');
var fs = require('fs');
// var path = require('path');
var data = require('./data.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var sqlite3 = require("sqlite3").verbose();
var cors = require('cors');
var bcrypt = require('bcrypt-nodejs');
var secret = require('./secrets.json');
var s3 = require('aws-sdk');
var multer = require('multer');
s3.config.region = 'us-east-1';

s3.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

var db = new sqlite3.Database("namegame.db");

app.use(express.static('public'));
app.use(multer({ dest: './uploads/'}));
app.use(cors());

app.use(session({
  secret: secret.password,
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));

// app.use(bodyParser.json({uploadDir:'/public/img'}));


// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

// app.get('/', function(req, res){
// data.makeStudentObject(function (v) {
//   var students = v;
//   console.log(students)
//   res.render('index', {students: students})
//    });
// });

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/login.html')
});

app.get('/main', function(req,res){
   console.log(req.session.user_id)
   res.sendFile(__dirname + '/public/index.html')
});


app.post('/users', function(req,res){
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
    bcrypt.hash(password, null, null, function(err, hash) {
        // Store hash in your password DB.
        db.run("INSERT INTO users (name, username, email, password) VALUES (?,?,?,?)", name, username, email, hash, function(err, row){
          if(err){
            throw err
          }else{
            var id = this.lastID;
            req.session.user_id = id;

            res.redirect('/main')
          }
        });
      });
});

app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  db.get("SELECT * FROM users WHERE username = ?", username, function(err, row) {
          if(err) { throw err; }
          if(row) {
            var passwordMatches = bcrypt.compareSync(password, row.password);
              if(passwordMatches) {
                req.session.user_id = row.id;
                res.redirect('/main');
              }
              else {
                res.redirect('/');
              }
            } else {
              res.redirect('/');
            }
  });
});

app.post('/photos', function(req,res){
  console.log(req.session.user_id)
  var s3bucket = new s3.S3({params: {Bucket: 'flipname'}});
  fs.readFile(req.files.file.path, function(err, file_buffer){
            var params = {
                Bucket: 'flipname',
                Key: req.session.user_id + req.body.student + "." + req.files.file.originalname.split(".")[1],
                Body: file_buffer
            };

            s3bucket.putObject(params, function (err, data) {
                if (err) {
                    console.log("Error uploading data: ", err);
                } else {
                    // var url = s3bucket.('putObject', params);
                    //   console.log("The URL is", url);
                }
            });
    });
});

app.get('/cohorts', function(req, res){
  db.all("SELECT * FROM cohorts", function(err, rows){
    if(err){
      throw err;
    }
    res.json(rows);
  })
})

app.get('/photos', function(req,res){
  db.all("SELECT * FROM photos", function(err, rows){
    if(err){
      throw err;
    }
    res.json(rows);
  });
});


app.post('/deletesession', function(req, res) {
  session.user_id = null
  res.redirect('/')
});



var server = app.listen(process.env.PORT || 3000, function(){

  var host = server.address().address
  var port = server.address().port

  console.log("hello", host, port)
})
