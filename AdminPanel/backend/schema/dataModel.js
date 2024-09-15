const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataSchema = new Schema({
    name: String, // String is shorthand for {type: String}
    mobile: String, 
    email: String,
    status:String
  
});

module.exports = mongoose.model('datas',dataSchema);