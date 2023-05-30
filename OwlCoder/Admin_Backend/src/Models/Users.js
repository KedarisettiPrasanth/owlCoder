
const mongoose = require('mongoose');

const schema = mongoose.Schema;
const User = new schema({
    first_name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    last_name: {
        type: String,
        required: true,
        minlength: 1,
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
        maxlength: 12
    },
    user_type:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20
    },
    profile_pic:{
        type:String,
        validate: {
            validator: function(value) {
              // Perform your MIME type validation here
              const allowedMimeTypes = ['image/jpeg', 'image/png'];
              const mimeType = value.split(';')[0]; // Extract MIME type from the value
              return allowedMimeTypes.includes(mimeType);
            },
            message: 'Invalid MIME type for the image field',
          },
    },
    emp_id: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 10
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    added_by: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200
    },
    created_date:{
        type:String,
        required:true,
        minlength:10,
        maxlength:1024
    },
    updated_date:{
        type:String,
        required:true,
        minlength:10,
        maxlength:1024
    },
    status: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 2
    }

});

module.exports = mongoose.model("User", User);


