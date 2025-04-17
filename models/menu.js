const mongoose = require('mongoose');
const menuSchema = mongoose.Schema({
    nameOfDish :{
        type :String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    ingredients:{
        type:[String],
        default:[]
    }
})
module.exports = mongoose.model('menu',menuSchema)
