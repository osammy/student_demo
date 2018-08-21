var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId

var departmentSchema = new Schema({    
    name:{
        type:String,
        unique:true,
        required:true
    },
    
    facultyID:{
        type:ObjectId,
        ref:'faculty'
    },
    code:{
        type:String,
        required:true,
        unique:true
    }
    
},    { timestamps: { createdAt: 'created_at' } }
)

var facultySchema = new Schema({    
    name:{
        type:String,
        unique:true,
        required:true
    },

    departments:[departmentSchema],
    code:{
        type:String,
        required:true,
        unique:true
    }

},    { timestamps: { createdAt: 'created_at' } }
)

const faculties = mongoose.model('faculty',facultySchema)

module.exports = faculties;