const axios = require('axios');
const dotenv = require('dotenv');
const video = require('../model/Video')
dotenv.config();
const API_KEY = process.env.API_KEY;

async function fetchPythonMicroservice(link) {
    try {
      const response = await axios.post('http://localhost:5000/transcribe', {
        video_url: link
      });
  
      return (response.transcript);
    } catch (error) {
      console.error(error);
    }
  }
  
//Create
const addVideoController = async (req,res)=>{
    const ID = req.params.id;

    const {videoId,thumbnail,total_duration,progress,url,playlistId} = req.body;
    const transcript = fetchPythonMicroservice(url)
    console.log(transcript);
    const newvideo = new video({
        id: ID,
        videoId,
        thumbnail,
        total_duration,
        progress,
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
const updateVideoController = async (req,res)=>{
    let updatedData = req.body.progress;
    let videoID = req.params.videoid;
    try{
        const updatedUser = await video.findOneAndUpdate(
            { videoId:videoID }, 
            { progress:updatedData }, 
            { new: true } 
        );
        res.json({
            message:"Done"
        })
    }catch(e){
        console.log(e);
    }
}

module.exports = {getVideoController,addVideoController,updateVideoController};
