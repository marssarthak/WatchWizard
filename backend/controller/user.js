const {user} = require('../model/User');

const addUserController = async(req,res)=>{
    const data = new user({
        userName:req.body.email
    })
    await data.save();
    res.status(200).send("User created");
}

const getUserController = async(req,res)=>{
    const users = await user.find({userName:req.body.email});
    res.json(users._id);
}


module.exports = {addUserController,getUserController};