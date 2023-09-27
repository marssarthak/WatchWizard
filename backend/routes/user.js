const express = require('express');
const router = express.Router();
const {addUserController,getUserController} = require('../controller/user');
router
    .get('/',getUserController)
    .post('/',addUserController)
    // .put('/',updateUserController)

module.exports = router;