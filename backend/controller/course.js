const express = require('express');
const router = express.Router();
const Course = require('../model/Course'); // Assuming your Course model is in a separate file
const user = require('../model/User'); // Assuming your User model is in a separate file
const video = require('../model/Video');
const axios = require('axios');
const openai = require('openai');
openai.apiKey = process.env.OPENAI_KEY;

const addVideoController = async(userId, videosArr)=>{
    videosArr.forEach(async ele => {
        const newvideo = new video({
            id:userId,
            title:ele.title,
            // courseName:ele.course
            videoId:ele.videoId,
            thumbnail:ele.thumbnail,
            total_duration:ele.duration,
            url:ele.url
        })
        try{
            await newvideo.save();
        }catch(e){
            console.log("error", e);
        }

        var eleId = ele.videoId;
        var eleUrl = ele.url;

        async function fetchPythonMicroservice() {
            try {
              const response = await axios.post('https://newtrasncribe.onrender.com/transcribe', {
                video_url: eleUrl
              });
            const transcript = response.data;  
            const prompt = `Generate an array of objects containing a question, options, and the correct answer from this transcript: ${transcript}`;

            const openaiResponse = await openai.Completion.create({
                 engine: 'davinci-codex',
                 prompt: prompt,
                max_tokens: 1000
              });

            console.log(openaiResponse.choices[0].text.trim());
            } catch (error) {
              console.error(error);
            }
          }
        await fetchPythonMicroservice();
    })
}
// POST route to add a new course with course items for a user
const addCourseController = async (req, res) => {
    const userId = req.params.id;
    await addVideoController(userId, req.body.videos);
    
    // Extract course data from the request body
    const { thumbnail,title,duration,video_id} = req.body;
        // Create a new course object associated with the user
        const newCourse = new Course({
            user: userId,
            courseItems:[
                {   
                    thumbnail,
                    title,
                    duration,
                    video_id,
                }
            ]
        });
        
    try{
        // Save the new course
        await newCourse.save().then(course => {
            // Update user profile with new course name
            return user.findOneAndUpdate(
              { _id: userId },  // replace 'userId' with the actual user ID
              { $push: { courses: course.name } },  // assumes 'courses' is an array field in the User schema
              { new: true, useFindAndModify: false }
            );
          })
          .then(user => {
            console.log('Updated user:', user);
          })
          .catch(err => {
            console.error('Error:', err);
          });;

        res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json(error);
    }
};

const getCourseController = async (req,res)=>{
    const userId = req.params.id;
    const User = await user.findById(userId);
    const courses = await Course.find({ user: userId });
    res.json(courses);
}

module.exports = {getCourseController,addCourseController,addVideoController};
