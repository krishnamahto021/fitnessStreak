const nodemailer = require('../config/nodemailer');

module.exports.forgetPassword = function(user,token){
    //console.log(`inside new sign up mailer ${user}`);
    let htmlString = nodemailer.renderTemplate({token:token},'/password/forget_password_mailer.ejs');

    nodemailer.transporter.sendMail({
        from:'mahtok422@gmail.com',
        to:user.email,
        subject:'Reset your password',
        html:htmlString
    },function(err,info){
        if(err){
            console.log(`err in sending mail ${err}`);
        }else{
       // console.log('message sent',info);
        }
    }  
    
    )
}