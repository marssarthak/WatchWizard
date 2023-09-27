const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const API_KEY = process.env.API_KEY;

const getVideoController = async (req,res)=>{
    const ID = req.body.id;
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${ID}&key=${API_KEY}`);
    res.json(response.data.items[0]);    
}
var getPlaylistController;
try{
    getPlaylistController = async (req,res)=>{
        const ID = req.params['id'];
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${ID}&key=${API_KEY}`);
        res.send(response.data.items);
    }
}catch(e){
    console.log(e);
}
module.exports = {getVideoController,getPlaylistController};
