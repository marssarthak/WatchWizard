const express = require('express');
const router = express.Router();
const {getVideoController,updateVideoController} = require('../controller/video')
const { addVideoController} = require('../controller/course')
router
    .post('/:id',addVideoController)
    .get('/:id',getVideoController)
    .patch('/:id/:videoid',updateVideoController)

module.exports = router;