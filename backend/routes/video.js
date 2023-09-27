const express = require('express');
const router = express.Router();
const {getVideoController, addVideoController,updateVideoController} = require('../controller/video')
router
    .post('/:id',addVideoController)
    .get('/:id',getVideoController)
    .patch('/:id/:videoid',updateVideoController)

module.exports = router;