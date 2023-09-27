const playlist = require('../model/Playlist');
const video = require('../model/Video');

const addPlaylistController = async(req,res)=>{
    const ID = req.params.id;
    const {playlistId,totalDuration,playlistDone,videos,url}=req.body;
    const newplaylist = new playlist({
        id:ID,
        playlistId,
        totalDuration,
        playlistDone,
        videos,
        url
    })

    try{
        await newplaylist.save();
        res.json(newplaylist);
    }catch(e){
        res.send(e);
    }
}

const getPlaylistController = async(req,res)=>{
    const playlists = await playlist.find({id:req.params.id});
    res.json(playlists);
}
const updatePlaylistController = async (req,res)=>{
    const userId = req.params.id;
    const playlistID = req.params.playlistId;
    const done = req.body.done;
    
    try{
        const updated = await playlist.findOneAndUpdate({
        playlistId:playlistID,
        playlistDone:done
    })
    res.json({message:"Updated"})
}   catch(e){
    console.log(e)
}

}

module.exports = {addPlaylistController,getPlaylistController,updatePlaylistController};