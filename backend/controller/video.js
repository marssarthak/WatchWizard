const axios = require('axios');
const dotenv = require('dotenv');
const course = require('../model/Course');
const video = require('../model/Video');

dotenv.config();
const API_KEY = process.env.API_KEY;

async function fetchPythonMicroservice(link) {
    try {
      const response = await axios.post('https://transcribe-ms-ybvd.onrender.com/transcribe', {
        video_url: link
      });
  
      return (response);
    } catch (error) {
      console.error(error);
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

module.exports = {getVideoController,updateVideoController};
