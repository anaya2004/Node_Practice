const mongoose = require('mongoose');
require('dotenv').config();
// const mongoUrl = 'mongodb://localhost:27017/mydb'
const mongoUrl = process.env.DB_URL;
mongoose.connect(mongoUrl,{
    useNewUrlParser :true,
    useUnifiedTopology:true
})
const db = mongoose.connection;
//event listeners
db.on('connected' , ()=>{
    console.log("connected to database");
})
db.on('disconnected' ,()=>{
    console.log("disconnect from database");
})
db.on('error',(err)=>{
    console.log("error:" ,err);
})
module.exports={
    db
};