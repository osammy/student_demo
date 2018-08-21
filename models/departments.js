var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId

var departmentSchema = new Schema({    
    name:{
        type:String
    },
    
    facultyID:{
        type:ObjectId,
        ref:'faculty'
    },
    code:{
        type:String
    }
    
},    { timestamps: { createdAt: 'created_at' } }
)

const departments = mongoose.model('department',departmentSchema)

module.exports = departments;