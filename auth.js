//local strategy
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');

const passport = require('passport');

//authentication using passport
passport.use(new LocalStrategy(async (USERNAME , password , done)=>{
    try{
        const user = await Person.findOne({username : USERNAME});
        if(!user)
            return done(null,false,{message : 'Incorrect Username!'});
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch){
            return done(null , false , {message:'Incorrect Password'});
        }else{
            return done(null ,user);
        }
    }catch(err){
        return done(err);
    }
}))

module.exports = passport;