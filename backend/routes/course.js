const express = require('express');
const router = express.Router();
const {getCourseController,addCourseController} = require('../controller/course');
router
    .get('/:id',getCourseController)
    .post('/:id',addCourseController)
    // .put('/',updateCourseController)

module.exports = router;