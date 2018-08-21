var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId

var studentSchema = new Schema({    
    name:{
        type:String,
        unique:true,
        required:true
    },
    
    matric_no:{
        type:String,
        unique:true,
        required:true
    },

    departmentID:{
        type:ObjectId,
        ref:'department'
    },
    level:{
        type:String,
        required:true
    }
},    { timestamps: { createdAt: 'created_at' } }
)

const students = mongoose.model('student',studentSchema)

module.exports = students;