const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    courseName:{
        type:String,
        unique:true
    },
    videoId:{
        type:String,
        unique:true,
    },
    title: String,
    thumbnail:String,
    total_duration: Number,
    progress:{
        type:Number,
        default:0
    },
    url:String,
    completed:Boolean,
    // quiz:[{
    //     ques:{
    //       type:String,
    //       unique:true,
            // default:""
    //     },
    //     ans: {
        // type:String,
        // default:""

    //   }]
})

const video = mongoose.model('video',videoSchema)
module.exports = video;