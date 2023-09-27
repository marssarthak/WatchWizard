const express = require('express');
const router = express.Router();
const {getVideoController, addVideoController} = require('../controller/video')
router
    .post('/:id',addVideoController)
    .get('/:id',getVideoController)

module.exports = router;