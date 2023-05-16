const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication using passport

passport.use(new LocalStrategy(
    {
        usernameField:'email',
    },
    async function(email,password,done){
        // find a user and establish the identity
        const user = await User.findOne({email:email});
        try{
            if(!user){
                console.log(`user not found!!`);
                return done(null,false);
            }
            else if(user.password != password){
                console.log('Invalid password!!');
                return done(null,false);
            }
            return done(null,user);
        }catch(err){
            console.log('error in finding user -----> passport',err);
            return done(err);
        }
    }
));

// serializig user to decide which key is to be kepts in cookies

passport.serializeUser(function(user,done){
    done(null,user.id);
});

// deserialzing user from the key in the cookies
passport.deserializeUser(async function(id,done){
    const user = await User.findById(id);
    try{
        return done(null,user);
    }catch(err){
        console.log(`eroor in finding user ----> passport`);
        return done(err);
    }
});

//check if the user is autheticated
passport.checkAuthentication = function(req,res,next){

    // if the user is signed in pass to next function that is user's controoler
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/sign-in');

};

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the currently signed in user and we are just sending it to the locals for views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;