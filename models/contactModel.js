const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLen:[4,'Name should be minimum of 4 characters'],
        maxLen:[16,'Name should not exceed 16 characterd']
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
    },
    jobpost:{
        type:String,
        default:'MERN developer'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const contactModel = mongoose.model('contact', contactSchema)
module.exports = contactModel