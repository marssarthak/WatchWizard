const express = require('express');
const router = express.Router();

const {getPlaylistController,addPlaylistController,updatePlaylistController} = require('../controller/playlist');
 
router
    .get('/:id',getPlaylistController)
    .post('/:id',addPlaylistController)
    .patch('/:id/:playlistId',updatePlaylistController)

module.exports = router;