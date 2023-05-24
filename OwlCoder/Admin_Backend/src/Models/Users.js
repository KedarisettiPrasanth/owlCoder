
const mongoose = require('mongoose');

const schema = mongoose.Schema;
const User = new schema({
    user_name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    userType:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20
    }
});

module.exports = mongoose.model("User", User);


