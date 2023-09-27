const express = require('express');
const router = express.Router();

router
    .get('/',getPlaylistController)
    .post('/',addPlaylistController)
    .put('/',updatePlaylistController)

module.exports = router;