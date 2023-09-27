const mongoose = require('mongoose');
const user = require('user');

const playlistSchema = mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    playlistId:String,
    totalVideos:Number,
    videoComp: Number,
    videos:[String],
    url:String
})

const playlist = mongoose.model('playlist',playlistSchema);
module.exports = playlist