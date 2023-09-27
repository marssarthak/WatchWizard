const express = require('express');
const cors = require('cors');
const app = express();
const courseRouter = require('./routes/course')
const videoRouter = require('./routes/video')
const progressRouter = require('./routes/progress')

// make schemas for all 
//  1. Course, video, playlist

//Middlewares
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Routes
app.use('/progress',progressRouter);
app.use('/course',courseRouter);
app.use('/video',videoRouter);

//Server Started on port 3000
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
