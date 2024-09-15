const express = require('express')
const router = express.Router()
const userDataModel = require('../schema/userModel');
const dataModel = require('../schema/dataModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req,res)=>{
    // console.log(req.body);
    const uemail = req.body.email;
    const alreadyExist = await userDataModel.findOne({email:uemail});
    // console.log(alreadyExist==null);
    
    if(alreadyExist==null){
      const pwd = req.body.password;
      const hashedpassword = bcrypt.hashSync(pwd,10);
      const data = new userDataModel({
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
        password:hashedpassword
      });
      const result = await data.save();
      // console.log(result);
      const token = jwt.sign({ data: result.email }, 'secret');
      res.send({status:1,"message":"Register Success",token:token});
      
      

    } else{
      res.send({status:0,"message":"Email Already Exist"});
    }
    
})

router.post('/login',async (req,res)=>{
  const email = req.body.email;
  const pwd = req.body.password;
  const isUserExist = await userDataModel.findOne({email:email});
  // console.log(isUserExist);
  if(isUserExist!=null){
    const dbpwd = isUserExist.password;
    const chkpwd = bcrypt.compareSync(pwd, dbpwd);
    const token = jwt.sign({ data: email }, 'secret');
    console.log(token);
    
    if(chkpwd){
      res.send({status:1,"message":"Login Success",token:token});
    } else{
      res.send({status:0,"message":"password mismatch"});
    }
    
    
  } else{
    res.send({status:0,"message":"email is not exist"});
  }
  
  
})

router.post('/adduser', async (req,res)=>{
  const data = new dataModel({
    name:req.body.name,
    email:req.body.email,
    mobile:req.body.mobile,
    status:req.body.status
  });
  const result = await data.save();
  res.send({status:1,"message":"Data Added Successfully"});
});

router.get('/list', async (req,res)=>{
    const userList = await dataModel.find({});
    res.send({data:userList});
});

// fetch single user data
router.put('/edituser', async (req,res)=>{
  try {
    let id= req.body.id;
    const userList = await dataModel.findOne({_id:id});
    res.send({data:userList});
  } catch (error) {
    res.send({message:error.message})
  }
});

router.post('/delete', async (req,res)=>{
  try {
    let id = req.body.id; 
    const result = await dataModel.findByIdAndDelete({_id:id});
    res.send({status:1,"message":"success"});
  } catch (error) {
    return res.send({status:0,"message":"This Id is Not Exist"});
  }
})

router.post('/update', async (req,res)=>{
  try {
    let id = req.body.id;
    const result = await dataModel.findByIdAndUpdate({_id:id},{...req.body}) ;
    if(result!=null){
      console.log(result);
      res.send({status:1,"message":"success"});
    } else{
      res.send({"message":"This Id is Not Exist"});
      
    }
  } catch (error) {
    res.send({"message":"failed"});
  }
})

module.exports = router;