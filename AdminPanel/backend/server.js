const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();


const db_connection = mongoose.connect(process.env.CONNECTION_STRING);
if(db_connection){
  console.log("DB Connected Successfully");
  
} else{
  console.log("Error");
  
}


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(cors())
// app.use(express.json()); /-> Only send the data in Raw format ,

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

require('./routes/router')(app)

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}/`)
})