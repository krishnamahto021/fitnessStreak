const User = require("../models/user");
const path = require('path');
const fs = require('fs');
const userSignupMailer = require('../mailers/sign_up_mailer');
const queue = require('../config/kue');
const signUpEmailWorker = require('../workers/sign_up_email_worker');

//render the user profile page
module.exports.profile = async function (req, res) {
    try {
        let user = await User.findById(req.params.id);
        return res.render('user_profile', {
            title: 'User profile',
            user_profile: user
        });
    } catch (err) {
        console.log('error in finding user!!', err);
    }
};



// render the sign in page
module.exports.signIn = function (req, res) {

    // if the user is already signed in redirect to profile page
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: 'Sign In'
    });
};

// render the sign up page
module.exports.signUp = function (req, res) {
    // if the user is already signed in redirect to profile page
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: 'Sign Up',
    });
};

//getting up the data from signup page
module.exports.create = async function (req, res) {
    try {
        if (req.body.password !== req.body.confirmPassword) {
            return res.redirect('back');
        }
        const user = await User.findOne({
            email: req.body.email
        });
        if (!user) { // user doesnot exist
            const newUser = await User.create(req.body);
            // userSignupMailer.signUp(newUser);  to send mail to user once he sign in

            let job = queue.create('emails',newUser).save(function(err){
                if(err){
                    console.log('error in KUE',err);
                }
                console.log('job enqueued',job.id);
            });

            return res.redirect('/users/sign-in');
        } else {
            // userSignupMailer.signUp(user);  to send mail to user once he sign in

            let job = queue.create('emails',user).save(function(err){
                if(err){
                    console.log('error in KUE',err);
                }
                console.log('job enqueued',job.id);
            });

            return res.redirect('back');
        }

    } catch (err) {
        console.log(`error in finding user in signinup ${err}`);
        return;
    }
}

// to fetch data from sign in from
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in Successfully!!');
    return res.redirect('/');
}


// to update the user
module.exports.update = async function (req, res) {

    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) { // uploadedAvatar helps us to read data from multipart form
                if (err) {
                    console.log('error in multer', err);
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {

                    // to check whther the file is uploaded multiple times or not in the avatars
                    if (user.avatar && fs.existsSync(__dirname + '..' + user.avatar)) {
                        fs.unlinkSync(path.join(__dirname + '..' + user.avatar));
                    }

                    // this is for saving the path of uploaded file into avatar field of user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })

        } catch (err) {
            req.flash('unauthorized', err);
            return res.redirect('back');
        }
    }
}

// to sign out the user
module.exports.signOut = function (req, res) {
    req.logout(function (err) {
        req.flash('error', 'something went wrong!!');
    });
    req.flash('success', 'logged out succesfuly!');
    return res.redirect('/');


}
