const Course = require('../Models/Courses');
var path = require('path')
const fs = require('fs');
const AddCourse = async (req, res, next) => {
    let course;
    const { course_name, course_content, course_type, tag, added_date, update_date, added_by, status } = req.body;
    const course_icon1 = req.files[0]['originalname'];
    const new_file = "files/" + req.files[0]['filename'] + path.extname(course_icon1);
    //Adding extension to the file name by rename the file 
    fs.rename("files/" + req.files[0]['filename'], new_file, function (err) {
        if (err) throw err;
    });

    if (req.files[0]['size'] > 20000) {
        try {
            course = new Course({
                course_name,
                course_icon1,
                course_content,
                course_type,
                tag,
                added_date,
                update_date,
                added_by,
                status
            });
            await course.save()
        } catch (err) {
            console.log(err);
        }
        if (!course) {
            return res.status(500).json({ message: "Course adding failed" })
        }
    }else{
        return res.status(500).json({message: "File size exceeded"})
    }
    
    return res.status(201).json({ message: course })
}

const getCourses = async (req, res, next) => {
    let courses;
    try {
        courses = await Course.find({})
    } catch (err) {
        console.log(err)
    }
    if (!courses) {
        return res.status(500).json({ message: "Courses not found" })
    }
    return res.status(201).json({ courses })
}

exports.AddCourse = AddCourse;
exports.getCourses = getCourses;