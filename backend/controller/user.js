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
    try{
        const users = await user.find({userName:req.query.email});
        const idString = users[0]._id.toString();
        res.json({id:idString});
    }catch(e){
        res.json({id:null});
    }
}


module.exports = {addUserController,getUserController};