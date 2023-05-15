const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const crypto = require('crypto');

passport.use(new googleStrategy({
    clientID: '951803195097-jd0t45bihn7gj8guluo6bgnpnh9km77k.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/users/auth/google/callback'
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            let user = await User.findOne({ email: profile.emails[0].value }).exec();
            console.log(profile);
            if(user){
                return done(null,user);
            }else{
                let userCreated = User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                });

                return done(null,userCreated);

            }
        } catch (err) {
            console.log('error in passport---->google-oauth', err);
        }
    }
))

