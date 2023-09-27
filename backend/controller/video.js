const axios = require('axios');
const dotenv = require('dotenv');
const video = require('../model/Video')
dotenv.config();
const API_KEY = process.env.API_KEY;

//Create
const addVideoController = async (req,res)=>{
    const ID = req.params.id;
    const {videoId,thumbnail,total_duration,url,playlistId} = req.body;
    const newvideo = new video({
        id: ID,
        videoId,
        thumbnail,
        total_duration,
        url,
        completed:false,
        playlistId
    })
    try{
        await newvideo.save();
        res.send(newvideo);
    }catch(e){
        res.send(e);
    }
}

//Read
const getVideoController = async (req,res)=>{
    const userID = req.params.id;
    let newvideo; 
    try{
        newvideo = await video.find({id:userID});
        res.json(newvideo);
    }catch(e){
        console.log(e)
    }
}

//Udpate


module.exports = {getVideoController,addVideoController};
