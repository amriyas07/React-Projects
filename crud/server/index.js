const express = require("express");
const userData = require("./data.json");
const app = express();
app.use(express.json());
const cors = require("cors");
const fs = require("fs");
const PORT = 8080;

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PATCH","DELETE"],
}));


app.get("/users",(req,res)=>{
    return res.json(userData);
});

app.delete("/users/:id",(req,res)=>{
    let id = Number(req.params.id);
    let filteredUser = userData.filter((user)=> user.id !== id);
    fs.writeFile("./data.json",JSON.stringify(filteredUser),(err,data)=>{
        return res.json(filteredUser);
    });
});

app.post("/users",(req,res)=>{
    const {name,age,city} = req.body;
    if(!name || !age || !city){
        res.status(400).send({message:"All Fields Required"});
    }
    let id = Date.now();
    userData.push({id,name,age,city});
    fs.writeFile("./data.json",JSON.stringify(userData),(err,data)=>{
        return res.json({"message":"user detail added successfully"});
    });
    
});

app.patch("/users/:id",(req,res)=>{
    let id = Number(req.params.id);
    const {name,age,city} = req.body;
    if(!name || !age || !city){
        res.status(400).send({message:"All Fields Required"});
    }
    let index = userData.findIndex((user)=>user.id==id);
    userData.splice(index,1,{...req.body});
    fs.writeFile("./data.json",JSON.stringify(userData),(err,data)=>{
        return res.json({"message":"user detail Updated successfully"});
    });
    
});

app.listen(PORT,(e)=>{
    console.log(`App is Listening in PORT ${PORT}`);
});