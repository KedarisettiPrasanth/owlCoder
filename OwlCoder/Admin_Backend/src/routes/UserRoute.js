const express = require('express');
const Router = express.Router();

const multer = require('multer') //multer
<<<<<<< HEAD
const upload = multer({ dest: 'uploads/course_icons' });
const userUpload = multer({dest:'./uploads/user_icons'})
=======
 const upload = multer({ dest: 'files/' });
>>>>>>> parent of c0ad60c (Merge branch 'development' of https://github.com/KedarisettiPrasanth/owlCoder into development)


const UserController = require('../controllers/UserController')
const CourseController = require('../controllers/CourseController')

Router.post('/register', UserController.Register);
Router.get('/users-list',UserController.getUsers);
Router.post('/login', UserController.loginUser);
Router.post('/add-course', upload.any(), CourseController.AddCourse);
Router.get('/courses-list', CourseController.getCourses);

module.exports = Router;