const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    videoId:{
        type:String,
    },
    thumbnail:String,
    total_duration: Number,
    progress:Number,
    url:String,
    completed:Boolean,
    playlistId:String
})

const video = mongoose.model('video',videoSchema)
module.exports = video;