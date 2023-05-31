
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
<<<<<<< HEAD
    },
    profile_pic:{
        type:String,
        // validate: {
        //     validator: function(value) {
        //       // Perform your MIME type validation here
        //       const allowedMimeTypes = ['image/jpeg', 'image/png'];
        //       const mimeType = value.split(';')[0]; // Extract MIME type from the value
        //       return allowedMimeTypes.includes(mimeType);
        //     },
        //     message: 'Invalid MIME type for the image field',
        //   },
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
=======
>>>>>>> parent of c0ad60c (Merge branch 'development' of https://github.com/KedarisettiPrasanth/owlCoder into development)
    }
});

module.exports = mongoose.model("User", User);


