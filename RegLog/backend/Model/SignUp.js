const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Register = new Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
},{timestamps:true});

module.exports = mongoose.model("RegisteredUsers",Register);