var fs = require('fs')


exports.makeStudentObject = function(cb){
var students = []
  fs.readdir('./public/img', function(err, list){
    list.forEach(function(file){
       var name = file.split(".")[0]
       var object = {name: name, pic: file}
       students.push(object)
    });
  return cb(students)
  });
}



// makeStudentObject(function (v) { console.log(v); });
