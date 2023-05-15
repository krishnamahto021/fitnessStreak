const User = require("../models/user");

//render the user profile page
module.exports.profile = async function(req,res){
    try{
        let user = await User.findById(req.params.id);
    
    return res.render('user_profile',{
        title:'User'
        
    });
}catch(err){
    console.log('error in finding user!!',err);
}
};



// render the sign in page
module.exports.signIn = function(req,res){

    // if the user is already signed in redirect to profile page
    if(req.isAuthenticated()){
        return res.redirec('/user/profile');
    }
    return res.render('user_sign_in',{
        title:'Sign In'
    });
};

// render the sign up page
module.exports.signUp = function(req,res){    
    // if the user is already signed in redirect to profile page
    if(req.isAuthenticated()){
        return res.redirec('/user/profile');
    }
    return res.render('user_sign_up',{
        title:'Sign Up',
    });
};

//getting up the data from signup page
module.exports.create = async function(req,res){
    try{
        if(req.body.password!== req.body.confirmPassword){
            return res.redirect('back');
        }
        const user = await User.findOne({
            email:req.body.email
        });

        if(!user){ // user doesnot exist
            const newUser = await User.create(req.body);
            return res.redirect('/user/sign-in');
        }else{
            return res.redirect('back');
        }

    }catch(err){
        console.log(`error in finding user in signinup ${err}`);
        return;
    }
}

// to fetch data from sign in from
module.exports.createSession = function(req,res){
    return res.redirect('/');
}
