const express = require('express');
const app = express();
const db = require('./db');
const Person = require('./models/person');
const Menu = require('./models/menu');
require('dotenv').config();

const bodyParser = require('body-parser')       //middleware
app.use(bodyParser.json())

const menuRoutes = require('./routes/menuRoutes');
const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('listening at',PORT);
})