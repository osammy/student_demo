const express = require('express')
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser')
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/student',{ useNewUrlParser: true },function(){
    console.log('succesfully connected to database')
});



const Students = require('./models/students');
const Departments = require('./models/departments');
const Faculties = require('./models/faculty')


// app.get('/faculties', function(req,res,next){

//     Faculties.find({},function(err,faculties){
//             if(err) return next(err);
//                 res.json(faculties)


//     })
// })
// app.get('/students',function(req,res,next){
//     Students.find({},function(err,students){
//         if(err) return next(err)
//         res.json(students)
//     })
// })
// app.get('/departments',function(req,res,next){
//     Students.find({},function(err,students){
//         if(err) return next(err)
//         res.json(students)
//     })
// })


//students
app.get('/students', function(req,res,next){
    Students.find({},function(err,student) {
        if(err) return next(err)
        res.json(student)
    })
})

app.post('/students', function(req,res,next){
    Students.create(req.body,function(err,student) {
        if(err) return next(err);

        res.json(student)
    })
})

app.get('/students/:id', function(req,res,next){

    const _id = req.params.id
    Students.find({_id}, function(err, student) {
        if(err) return next(err);

        res.json(student);
    })
})
//departments
app.post('/departments', function(req,res,next){
    Departments.create(req.body,function(err,department) {

        const facultyId = department.facultyID;
        console.log(facultyId)
        Faculties.findById(facultyId,function(err,faculty){
            if(err) return next(err)

            faculty.departments.push(department)
            faculty.save(function(err,faculty){
                if(err) return next(err);
                res.json(department)

            })
        })
    })
})

app.get('/departments', function(req,res,next){
    Departments.find({},function(err,departments) {
                if(err) return next(err)
                    res.json(departments)
    })
})
//faculties
app.get('/faculties', function(req,res,next){
    Faculties.find({},function(err,student) {
            if(err) return next(err)
            res.json(student)
    })
})

app.post('/faculties', function(req,res,next){
    Faculties.create(req.body,function(err,faculty) {
        if(err) return next(err)
        res.json(faculty)
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

