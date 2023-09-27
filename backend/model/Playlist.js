const mongoose = require('mongoose');
const user = require('../model/User');

const playlistSchema = mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    playlistId:{
        type:String,
        unique:true
    },
    totalDuration:Number,
    playlistDone: {
        type:Number,
        default:0
    },
    videos:[String],
    url:String
})

const playlist = mongoose.model('playlist',playlistSchema);
module.exports = playlist