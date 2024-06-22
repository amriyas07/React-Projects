const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Route = require('./Route/SignRoute');
const cors = require('cors');
const app = express();

app.use(express.json())
app.use(cors());

app.use((req,res,next)=>{
    console.log(req.path+" Method "+req.method);
    next();
});

app.get('/',(req,res)=>{
    res.send("Welcome");
});
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`App is Listening in PORT ${process.env.PORT}`);
    });
})
.catch((err)=>console.log(err))

app.use('/user',Route);