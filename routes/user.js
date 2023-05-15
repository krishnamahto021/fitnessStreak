const express = require('express');
const router = express.Router();


const userController = require('../controllers/user_controller');
const passport = require('passport');

router.get('/profile',userController.profile);
router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);


// to sign up the user
router.post('/create',userController.create);

// to sign in the user
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/users/sign-in'}),userController.createSession);

//to signup or sign in the user via google
router.get('/auth/google',passport.authenticate('google',{scope:['profile','emails']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.createSession);


module.exports = router;
