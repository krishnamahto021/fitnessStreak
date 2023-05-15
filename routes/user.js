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

// to use google authentication
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.createSession);




module.exports = router;
