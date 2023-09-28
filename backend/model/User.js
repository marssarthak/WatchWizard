const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String, 
    },
    courses:[String]
})

const user = new mongoose.model('user',userSchema);

module.exports = user;