const express = require('express');
const Router = express.Router();

const multer = require('multer') //multer

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'images/')
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname)
//     },
//   })
 const middle = express.urlencoded({
    extended: false,
    limit: 10000,
    parameterLimit: 2,
 })
 const upload = multer({ dest: 'files/' });


const UserController = require('../controllers/UserController')
const CourseController = require('../controllers/CourseController')

Router.post('/register', UserController.Register);
Router.get('/users-list',UserController.getUsers);
Router.post('/login', UserController.loginUser);
Router.post('/add-course', upload.any(), CourseController.AddCourse);
Router.get('/courses-list', CourseController.getCourses);

module.exports = Router;