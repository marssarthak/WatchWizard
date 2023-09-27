const express = require('express');
const router = express.Router();

router
    .get('/',getCourseController)
    .post('/',addCourseController)
    .put('/',updateCourseController)

module.exports = router;