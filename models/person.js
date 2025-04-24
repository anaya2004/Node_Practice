const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    },
    username :{
        type : String,
        required:true
    },
    password:{
        type : String,
        required : true
    }
})

personSchema.pre('save',async function(next){
    const person = this;
    //hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();       //this means we have already hashed password 
    try{
        //hash password generation 
        //add salt
        const salt = await bcrypt.genSalt(10);
        //add salt to password and hash it 
        const hashedPassword = await bcrypt.hash(person.password,salt);
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
})

//compare function which will compare upcoming password with stored password
personSchema.methods.comparePassword = async function(Password){
    try{
        const isMatch = await bcrypt.compare(Password,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

module.exports = mongoose.model('person',personSchema);
