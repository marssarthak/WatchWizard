const express = require('express');
const router = express.Router();
const Course = require('../model/Course'); // Assuming your Course model is in a separate file
const user = require('../model/User'); // Assuming your User model is in a separate file

// POST route to add a new course with course items for a user
const addCourseController = async (req, res) => {
    const userId = req.params.id;

    try {
        const User = await user.findById(userId);
        // Extract course data from the request body
        const { name,video_id} = req.body;

        // Create a new course object associated with the user
        const newCourse = new Course({
            user: User._id,
            courseItems:[
                {
                    name,
                    video_id,
                 
                }
            ]
        });

        // Save the new course
        await newCourse.save();

        res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getCourseController = async (req,res)=>{
    const userId = req.params.id;
    const User = await user.findById(userId);
    const courses = await Course.find({ user: User._id });
    res.json(courses);
}

module.exports = {getCourseController,addCourseController};
