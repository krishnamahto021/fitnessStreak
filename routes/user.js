const express = require('express');
const router = express.Router();


const userController = require('../controllers/user_controller');
const passport = require('passport');

router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);


// to sign up the user
router.post('/create',userController.create);

// to sign in the user
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/users/sign-in'}),userController.createSession);


//to signup or sign in the user via google
router.get('/auth/google',passport.authenticate('google',{scope:[ 'profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.createSession);

// to show profile to user
router.get('/profile/:id',passport.checkAuthentication,userController.profile);


// to update the user
router.post('/update/:id',passport.checkAuthentication,userController.update);

// to signout the user
router.get('/sign-out',userController.signOut);

// to reset and update password
// to render the forget password form
router.get('/forget-password',userController.forgetPassword);

// to get data from the form
router.post('/forget-password',userController.resetPassword);

// to show new form for new password
router.get('/reset-password',userController.resetPasswordLoad);

// to update password
router.post('/update-password',userController.updatePassword);


module.exports = router;
