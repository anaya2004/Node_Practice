const express = require('express');
const app = express();
const db = require('./db');
const Person = require('./models/person');
const Menu = require('./models/menu');
//passport
const passport = require('./auth');



require('dotenv').config();

const bodyParser = require('body-parser')       //middleware
app.use(bodyParser.json())

//logging date and time using middleware logRequest
const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next();
}
app.use(logRequest);



app.use(passport.initialize());

//authenticate this api 
app.get('/',passport.authenticate('local',{session:false}),function(req,res){
    res.send('Welcome');
})

//routes 
const menuRoutes = require('./routes/menuRoutes');
const personRoutes = require('./routes/personRoutes');
app.use('/person',passport.authenticate('local',{session:false}),personRoutes);
app.use('/menu',menuRoutes);

const PORT = process.env.PORT || 3000;      //if env does not have port then give 3000

app.listen(PORT,()=>{
    console.log('listening at',PORT);
})