const mongoose = require('mongoose');
const personSchema = mongoose.Schema({
    name :{
        type : String,
        required :true
    },
    work:{
        type :String,
        enum :['chef','manager','owner']
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
})

module.exports = mongoose.model('person',personSchema);
