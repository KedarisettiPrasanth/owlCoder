
const mongoose = require('mongoose');

const schema = mongoose.Schema;
const Course = new schema({
    course_name: {
        type: String,
        // required: true,
        minlength: 5,
        maxlength: 50
    },
    course_icon1: {
        type: String,
        // required: true,
    },
    course_content: {
        type: String,
        // required: true,
        minlength: 5,
        maxlength: 1024
    },
    course_type:{
        type:String,
        // required:true,
        minlength:2,
        maxlength:20
    },
    tag:{
        type:String,
        // required:true,
        minlength:2,
        maxlength:20
    },
    added_date:{
        type:String,
        // required:true,
        minlength:2,
        maxlength:500
    },
    update_date:{
        type:String,
        // required:true,
        minlength:2,
        maxlength:500
    },
    added_by:{
        type:String,
        // required:true,
        minlength:2,
        maxlength:20
    },
    status:{
        type:Number,
        // required:true,
        minlength:1,
        maxlength:2
    }
});

module.exports = mongoose.model("Course", Course);


