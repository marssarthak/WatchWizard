const mongoose = require('mongoose');

const courseItemSchema = new mongoose.Schema({
    title: {
        type:String,
        required:[true,'Please enter the Course Name'],
        unique:true
    },
    thumbnail:String,
    duration: Number,
    start_date: {
        type: Date,
        default: Date.now 
    },
    video_id: [String],
});

const courseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    courseItems: [courseItemSchema]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
