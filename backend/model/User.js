const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String, 
        unique:true,
        required:true
    },
    courses:[{}]
})

const user = new mongoose.model('user',userSchema);

module.exports = user;