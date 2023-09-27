const user = require('../model/User');

const addUserController = async(req,res)=>{
    const email = req.body.email;
    const data = new user({
        userName:email
    })
    await data.save();
    res.status(200).send("User created");
}

const getUserController = async(req,res)=>{
    const users = await user.find({userName:req.body.email});
    const idString = users[0]._id.toString();
    res.json({id:idString});
}


module.exports = {addUserController,getUserController};