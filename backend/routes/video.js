const express = require('express');
const router = express.Router();
const {getVideoController,getPlaylistController} = require('../controller/video')
router
    .get('/',getVideoController)
    .get('/playlist/:id',getPlaylistController)

module.exports = router;