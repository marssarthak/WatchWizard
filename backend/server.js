const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const userRouter = require('./routes/user')
const courseRouter = require('./routes/course')
const videoRouter = require('./routes/video')
// const playlistRouter = require('./routes/playlist')

dotenv.config();

try {
    mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Database Connected');
  } catch (error) {
    console.log(error);
  }

// make schemas for all 
//  1. Course, video, playlist

//Middlewares
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Routes
// app.use('/playlist',playlistRouter);
app.use('/course',courseRouter);
app.use('/video',videoRouter);
app.use('/user',userRouter);

//Server Started on port 3000
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
