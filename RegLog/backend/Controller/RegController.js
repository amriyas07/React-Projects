const express = require('express');
const Register = require('../Model/SignUp');
const bcrypt = require('bcrypt');

const CreateAccount =  (req,res)=>{
    const {username,email,password} = req.body;
    try{
        bcrypt.hash(password,10).then((hash)=>{
            const NewUser = Register.create({username:username,email:email,password:hash});
            res.status(200).json(NewUser);
        });

    } catch(e){
        res.status(400).json({error:e.message});
    }
}

const LoginCheck = (req,res)=>{
    const {email,password} = req.body;
       Register.findOne({email:email})
        .then(user=>{
            if(user){
                bcrypt.compare(password,user.password,(errs,response)=>{
                    if(response){
                        res.json("Success");
                    } else{
                        res.json("Password Incorrect");
                    }
                });
            } else{
                res.json("Not Registered");
            }
        })
        .catch((e)=>console.log(e));
    
};

module.exports = {CreateAccount,LoginCheck};